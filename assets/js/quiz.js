(function () {
  'use strict';

  function t(key, fallback, vars) {
    if (window.mgeneticaI18n && typeof window.mgeneticaI18n.t === 'function') {
      return window.mgeneticaI18n.t(key, fallback, vars);
    }
    if (!vars) return fallback;
    return String(fallback).replace(/\{([a-zA-Z0-9_]+)\}/g, function (_, name) {
      return Object.prototype.hasOwnProperty.call(vars, name) ? vars[name] : '{' + name + '}';
    });
  }

  function getAssetPrefix() {
    if (window.mgeneticaI18n && typeof window.mgeneticaI18n.getAssetPrefix === 'function') {
      return window.mgeneticaI18n.getAssetPrefix();
    }
    var path = window.location.pathname;
    return path.indexOf('/modules/') >= 0 || path.indexOf('/semanas/') >= 0 ? '../' : '';
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function quizPath(moduleId) {
    return getAssetPrefix() + 'quizzes/quiz-' + moduleId + '.json';
  }

  function showMessage(container, message, type) {
    container.innerHTML =
      '<div class="quiz-result ' + (type || 'result-fail') + '" role="status" aria-live="polite" style="display:block">' +
        escapeHtml(message) +
      '</div>';
  }

  function loadQuiz(moduleId) {
    return fetch(quizPath(moduleId), { cache: 'no-cache' }).then(function (response) {
      if (!response.ok) throw new Error(t('quiz.not_found', 'Quiz {module} não encontrado.', { module: moduleId }));
      return response.json();
    });
  }

  function renderQuiz(container) {
    var moduleId = container.getAttribute('data-module');
    if (!moduleId) return;

    container.innerHTML = '<p class="quiz-subtitle">' + escapeHtml(t('quiz.loading', 'Carregando quiz...')) + '</p>';

    loadQuiz(moduleId)
      .then(function (data) {
        buildQuiz(container, moduleId, data);
      })
      .catch(function () {
        showMessage(
          container,
          t('quiz.load_fail', 'Não foi possível carregar o quiz. Use o preview/publicação do Quarto para ativar esta avaliação.')
        );
      });
  }

  function buildQuiz(container, moduleId, data) {
    if (!data || !Array.isArray(data.questions) || data.questions.length === 0) {
      showMessage(container, t('quiz.empty', 'Quiz sem questões cadastradas.'));
      return;
    }

    var html = '<div class="quiz-title" id="quiz-title-' + moduleId + '">' + escapeHtml(data.title || t('quiz.default_title', 'Quiz - Módulo {module}', { module: moduleId })) + '</div>';
    html += '<p class="quiz-subtitle">' +
      escapeHtml(data.subtitle || t('quiz.default_subtitle', 'Responda as questões abaixo. São necessários {passMark} acertos.', { passMark: data.passMark })) +
      '</p>';

    data.questions.forEach(function (q, qi) {
      html += '<div class="quiz-question" data-qi="' + qi + '">';
      html += '<div class="quiz-question-text">' + (qi + 1) + '. ' + escapeHtml(q.text) + '</div>';
      html += '<div class="quiz-options" role="group" aria-label="' + escapeHtml(t('quiz.question_label', 'Questão {index}', { index: qi + 1 })) + '">';
      q.options.forEach(function (opt, oi) {
        html +=
          '<button class="quiz-option" type="button" data-oi="' + oi + '" aria-pressed="false" aria-label="' + escapeHtml(t('quiz.option_label', 'Opção {index}', { index: oi + 1 })) + '">' +
          '<span class="opt-letter">' + ['A', 'B', 'C', 'D', 'E'][oi] + '.</span> ' + escapeHtml(opt) +
          '</button>';
      });
      html += '</div></div>';
    });

    html += '<button class="quiz-submit-btn" type="button" disabled aria-describedby="quiz-title-' + moduleId + '">' + escapeHtml(t('quiz.submit', 'Verificar respostas')) + '</button>';
    html += '<div class="quiz-result" role="status" aria-live="polite" style="display:none"></div>';

    container.innerHTML = html;
    attachQuizEvents(container, moduleId, data);
    updateTeacherHints(container, data);
  }

  function updateTeacherHints(container, data) {
    container.querySelectorAll('.teacher-answer').forEach(function (el) { el.remove(); });
    if (!document.documentElement.classList.contains('teacher-mode')) return;

    container.querySelectorAll('.quiz-question').forEach(function (qEl) {
      var qi = parseInt(qEl.getAttribute('data-qi'), 10);
      var q = data.questions[qi];
      var answer = q.options[q.correct];
      var note = document.createElement('div');
      note.className = 'teacher-answer';
      note.innerHTML = '<strong>' + escapeHtml(t('quiz.answer_key', 'Gabarito:')) + '</strong> ' + escapeHtml(answer) +
        '<br><span>' + escapeHtml(t('quiz.teacher_note', 'Comentario: esta alternativa preserva a definicao tecnica usada no modulo e deve ser conectada ao resultado da simulacao em R.')) + '</span>';
      qEl.appendChild(note);
    });
  }

  function attachQuizEvents(container, moduleId, data) {
    var answers = new Array(data.questions.length).fill(null);
    var submit = container.querySelector('.quiz-submit-btn');

    container.querySelectorAll('.quiz-question').forEach(function (qEl) {
      var qi = parseInt(qEl.getAttribute('data-qi'), 10);
      qEl.querySelectorAll('.quiz-option').forEach(function (btn) {
        btn.addEventListener('click', function () {
          if (btn.classList.contains('correct') || btn.classList.contains('incorrect')) return;

          qEl.querySelectorAll('.quiz-option').forEach(function (option) {
            option.classList.remove('selected');
            option.setAttribute('aria-pressed', 'false');
          });

          btn.classList.add('selected');
          btn.setAttribute('aria-pressed', 'true');
          answers[qi] = parseInt(btn.getAttribute('data-oi'), 10);
          submit.disabled = !answers.every(function (answer) { return answer !== null; });
        });
      });
    });

    submit.addEventListener('click', function () {
      this.disabled = true;
      gradeQuiz(container, moduleId, data, answers);
    });

    document.addEventListener('mgenetica:teacher-mode', function () {
      updateTeacherHints(container, data);
    });
  }

  function gradeQuiz(container, moduleId, data, answers) {
    var correct = 0;

    container.querySelectorAll('.quiz-question').forEach(function (qEl) {
      var qi = parseInt(qEl.getAttribute('data-qi'), 10);
      var selected = answers[qi];
      var rightAnswer = data.questions[qi].correct;

      qEl.querySelectorAll('.quiz-option').forEach(function (btn) {
        var oi = parseInt(btn.getAttribute('data-oi'), 10);
        btn.classList.remove('selected');
        btn.setAttribute('aria-pressed', 'false');
        if (oi === rightAnswer) {
          btn.classList.add('correct');
          btn.setAttribute('aria-label', t('quiz.correct', 'Resposta correta'));
        } else if (oi === selected) {
          btn.classList.add('incorrect');
          btn.setAttribute('aria-label', t('quiz.wrong_selected', 'Resposta selecionada incorreta'));
        }
      });

      if (selected === rightAnswer) correct++;
    });

    var resultEl = container.querySelector('.quiz-result');
    var passMark = data.passMark || data.questions.length;
    var passed = correct >= passMark;
    resultEl.style.display = 'block';

    if (passed) {
      resultEl.className = 'quiz-result result-pass';
      resultEl.innerHTML =
        escapeHtml(t('quiz.pass', 'Você acertou {correct} de {total} questões e concluiu o Módulo {module}.', {
          correct: correct,
          total: data.questions.length,
          module: moduleId
        }));
      if (window.mgenetica) {
        window.mgenetica.markModuleComplete('modulo' + moduleId);
      }
    } else {
      resultEl.className = 'quiz-result result-fail';
      resultEl.innerHTML =
        escapeHtml(t('quiz.fail', 'Você acertou {correct} de {total} questões. São necessários {passMark} acertos. Revise o conteúdo e tente novamente.', {
          correct: correct,
          total: data.questions.length,
          passMark: passMark
        }));
    }

    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    resultEl.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest' });
  }

  function initQuizzes() {
    document.querySelectorAll('.quiz-container[data-module]').forEach(renderQuiz);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initQuizzes);
  } else {
    initQuizzes();
  }

  document.addEventListener('mgenetica:i18n-ready', function () {
    document.querySelectorAll('.quiz-container[data-module]').forEach(function (container) {
      renderQuiz(container);
    });
  });
})();
