const exercises = {
            'if-else': {
                title: 'IF / ELSE - Classificador de Idade',
                description: 'Complete a função que classifica uma pessoa por faixa etária',
                initialCode: `function classificarIdade(idade) {
  // Complete o código abaixo:
  if (idade < 0) {
    return "Idade inválida";
  } else if (/* adicione condição */) {
    return "Criança";
  } else if (/* adicione condição */) {
    return "Adolescente";
  } else if (/* adicione condição */) {
    return "Adulto";
  } else {
    return "Idoso";
  }
}`,
                solution: `function classificarIdade(idade) {
  if (idade < 0) {
    return "Idade inválida";
  } else if (idade <= 12) {
    return "Criança";
  } else if (idade <= 17) {
    return "Adolescente";
  } else if (idade <= 59) {
    return "Adulto";
  } else {
    return "Idoso";
  }
}`,
                tests: [
                    { input: 8, expected: 'Criança' },
                    { input: 15, expected: 'Adolescente' },
                    { input: 30, expected: 'Adulto' },
                    { input: 65, expected: 'Idoso' },
                    { input: -5, expected: 'Idade inválida' }
                ],
                functionName: 'classificarIdade'
            },
            'switch': {
                title: 'SWITCH - Conversor de Dias',
                description: 'Use switch para converter números em dias da semana',
                initialCode: `function diaDaSemana(numero) {
  // Use switch para retornar o dia correspondente
  // 1 = Domingo, 2 = Segunda, etc.
  switch (numero) {
    // Complete aqui
    
    default:
      return "Número inválido";
  }
}`,
                solution: `function diaDaSemana(numero) {
  switch (numero) {
    case 1:
      return "Domingo";
    case 2:
      return "Segunda-feira";
    case 3:
      return "Terça-feira";
    case 4:
      return "Quarta-feira";
    case 5:
      return "Quinta-feira";
    case 6:
      return "Sexta-feira";
    case 7:
      return "Sábado";
    default:
      return "Número inválido";
  }
}`,
                tests: [
                    { input: 1, expected: 'Domingo' },
                    { input: 3, expected: 'Terça-feira' },
                    { input: 7, expected: 'Sábado' },
                    { input: 9, expected: 'Número inválido' }
                ],
                functionName: 'diaDaSemana'
            },
            'for': {
                title: 'FOR - Soma de Números',
                description: 'Use for para calcular a soma de 1 até N',
                initialCode: `function somaAteN(n) {
  let soma = 0;
  // Use um loop for para somar de 1 até n
  
  return soma;
}`,
                solution: `function somaAteN(n) {
  let soma = 0;
  for (let i = 1; i <= n; i++) {
    soma += i;
  }
  return soma;
}`,
                tests: [
                    { input: 5, expected: 15 },
                    { input: 10, expected: 55 },
                    { input: 1, expected: 1 },
                    { input: 100, expected: 5050 }
                ],
                functionName: 'somaAteN'
            },
            'while': {
                title: 'WHILE - Contagem de Dígitos',
                description: 'Use while para contar quantos dígitos tem um número',
                initialCode: `function contarDigitos(numero) {
  let count = 0;
  numero = Math.abs(numero); // Remove sinal negativo
  
  // Use while para contar os dígitos
  
  return count === 0 ? 1 : count;
}`,
                solution: `function contarDigitos(numero) {
  let count = 0;
  numero = Math.abs(numero);
  
  while (numero >= 1) {
    numero = Math.floor(numero / 10);
    count++;
  }
  
  return count === 0 ? 1 : count;
}`,
                tests: [
                    { input: 12345, expected: 5 },
                    { input: 7, expected: 1 },
                    { input: 1000, expected: 4 },
                    { input: -999, expected: 3 }
                ],
                functionName: 'contarDigitos'
            },
            'ternario': {
                title: 'OPERADOR TERNÁRIO - Par ou Ímpar',
                description: 'Use o operador ternário para verificar se é par ou ímpar',
                initialCode: `function parOuImpar(numero) {
  // Use operador ternário: condição ? valor_se_true : valor_se_false
  return /* complete aqui */;
}`,
                solution: `function parOuImpar(numero) {
  return numero % 2 === 0 ? "Par" : "Ímpar";
}`,
                tests: [
                    { input: 4, expected: 'Par' },
                    { input: 7, expected: 'Ímpar' },
                    { input: 0, expected: 'Par' },
                    { input: -3, expected: 'Ímpar' }
                ],
                functionName: 'parOuImpar'
            }
        };

        let activeTab = 'if-else';

        function init() {
            renderTabs();
            loadExercise(activeTab);
        }

        function renderTabs() {
            const tabsContainer = document.getElementById('tabs');
            tabsContainer.innerHTML = '';
            
            Object.keys(exercises).forEach(key => {
                const button = document.createElement('button');
                button.className = `tab ${key === activeTab ? 'active' : ''}`;
                button.textContent = key.toUpperCase();
                button.onclick = () => changeTab(key);
                tabsContainer.appendChild(button);
            });
        }

        function changeTab(tab) {
            activeTab = tab;
            renderTabs();
            loadExercise(tab);
            clearResults();
        }

        function loadExercise(tab) {
            const exercise = exercises[tab];
            document.getElementById('exercise-title').textContent = exercise.title;
            document.getElementById('exercise-description').textContent = exercise.description;
            document.getElementById('code-editor').value = exercise.initialCode;
        }

        function resetCode() {
            loadExercise(activeTab);
            clearResults();
        }

        function showSolution() {
            const exercise = exercises[activeTab];
            document.getElementById('code-editor').value = exercise.solution;
        }

        function clearResults() {
            document.getElementById('results').innerHTML = '<div class="empty-results">Execute os testes para ver os resultados</div>';
        }

        function runTests() {
            const code = document.getElementById('code-editor').value;
            const exercise = exercises[activeTab];
            const resultsContainer = document.getElementById('results');
            
            try {
                eval(code);
                
                const testResults = exercise.tests.map(test => {
                    try {
                        const func = eval(exercise.functionName);
                        const result = func(test.input);
                        return {
                            input: test.input,
                            expected: test.expected,
                            actual: result,
                            passed: result === test.expected
                        };
                    } catch (err) {
                        return {
                            input: test.input,
                            expected: test.expected,
                            actual: 'Erro',
                            passed: false,
                            error: err.message
                        };
                    }
                });

                displayResults(testResults);
            } catch (error) {
                resultsContainer.innerHTML = `
                    <div class="error-banner">
                        <strong>❌ Erro no código:</strong><br>
                        ${error.message}
                    </div>
                `;
            }
        }

        function displayResults(results) {
            const resultsContainer = document.getElementById('results');
            const allPassed = results.every(r => r.passed);
            
            let html = '';
            
            if (allPassed) {
                html += '<div class="success-banner">🎉 Parabéns! Todos os testes passaram!</div>';
            }
            
            results.forEach((result, idx) => {
                const statusClass = result.passed ? 'pass' : 'fail';
                const statusIcon = result.passed ? '✓' : '✗';
                
                html += `
                    <div class="test-result ${statusClass}">
                        <div class="test-result-header">
                            <strong>Teste ${idx + 1}</strong>
                            <span>${statusIcon}</span>
                        </div>
                        <code><strong>Input:</strong> ${JSON.stringify(result.input)}</code>
                        <code><strong>Esperado:</strong> ${JSON.stringify(result.expected)}</code>
                        <code><strong>Obtido:</strong> ${JSON.stringify(result.actual)}</code>
                        ${result.error ? `<code style="color: #721c24;"><strong>Erro:</strong> ${result.error}</code>` : ''}
                    </div>
                `;
            });
            
            resultsContainer.innerHTML = html;
        }

        init();