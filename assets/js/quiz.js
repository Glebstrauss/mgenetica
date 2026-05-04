(function () {
  'use strict';

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function getAssetPrefix() {
    var path = window.location.pathname;
    return path.indexOf('/modules/') >= 0 || path.indexOf('/semanas/') >= 0 ? '../' : '';
  }

  function quizPath(moduleId) {
    return getAssetPrefix() + 'quizzes/quiz-' + moduleId + '.json';
  }

  function showMessage(container, message, type) {
    container.innerHTML =
      '<div class="quiz-result ' + (type || 'result-fail') + '" style="display:block">' +
        escapeHtml(message) +
      '</div>';
  }

  function loadQuiz(moduleId) {
    return fetch(quizPath(moduleId), { cache: 'no-cache' }).then(function (response) {
      if (!response.ok) throw new Error('Quiz ' + moduleId + ' não encontrado.');
      return response.json();
    });
  }

  function renderQuiz(container) {
    var moduleId = container.getAttribute('data-module');
    if (!moduleId) return;

    container.innerHTML = '<p class="quiz-subtitle">Carregando quiz...</p>';

    loadQuiz(moduleId)
      .then(function (data) {
        buildQuiz(container, moduleId, data);
      })
      .catch(function () {
        showMessage(
          container,
          'Não foi possível carregar o quiz. Use o preview/publicação do Quarto para ativar esta avaliação.'
        );
      });
  }

  function buildQuiz(container, moduleId, data) {
    if (!data || !Array.isArray(data.questions) || data.questions.length === 0) {
      showMessage(container, 'Quiz sem questões cadastradas.');
      return;
    }

    var html = '<div class="quiz-title">' + escapeHtml(data.title || ('Quiz - Módulo ' + moduleId)) + '</div>';
    html += '<p class="quiz-subtitle">' +
      escapeHtml(data.subtitle || ('Responda as questões abaixo. São necessários ' + data.passMark + ' acertos.')) +
      '</p>';

    data.questions.forEach(function (q, qi) {
      html += '<div class="quiz-question" data-qi="' + qi + '">';
      html += '<div class="quiz-question-text">' + (qi + 1) + '. ' + escapeHtml(q.text) + '</div>';
      html += '<div class="quiz-options">';
      q.options.forEach(function (opt, oi) {
        html +=
          '<button class="quiz-option" type="button" data-oi="' + oi + '" aria-label="Opção ' + (oi + 1) + '">' +
          '<span class="opt-letter">' + ['A', 'B', 'C', 'D', 'E'][oi] + '.</span> ' + escapeHtml(opt) +
          '</button>';
      });
      html += '</div></div>';
    });

    html += '<button class="quiz-submit-btn" type="button" disabled>Verificar respostas</button>';
    html += '<div class="quiz-result" style="display:none"></div>';

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
      note.innerHTML = '<strong>Gabarito:</strong> ' + escapeHtml(answer) +
        '<br><span>Comentario: esta alternativa preserva a definicao tecnica usada no modulo e deve ser conectada ao resultado da simulacao em R.</span>';
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
          });

          btn.classList.add('selected');
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
        if (oi === rightAnswer) btn.classList.add('correct');
        else if (oi === selected) btn.classList.add('incorrect');
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
        'Você acertou ' + correct + ' de ' + data.questions.length +
        ' questões e concluiu o Módulo ' + moduleId + '.';
      if (window.mgenetica) {
        window.mgenetica.markModuleComplete('modulo' + moduleId);
      }
    } else {
      resultEl.className = 'quiz-result result-fail';
      resultEl.innerHTML =
        'Você acertou ' + correct + ' de ' + data.questions.length +
        ' questões. São necessários ' + passMark +
        ' acertos. Revise o conteúdo e tente novamente.';
    }

    resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function initQuizzes() {
    document.querySelectorAll('.quiz-container[data-module]').forEach(renderQuiz);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initQuizzes);
  } else {
    initQuizzes();
  }
})();
