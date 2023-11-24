function submitForm() {
    const matricula = document.getElementById('matricula').value;
    const aluno = document.getElementById('aluno').value;
    const mediaG1 = document.getElementById('mediaG1').value;
    const mediaG2 = document.getElementById('mediaG2').value;
    const mediaFinal = document.getElementById('mediaFinal').value;
    const disciplina = document.getElementById('disciplina').value;

    const data = {
        matricula,
        aluno,
        mediaG1: parseFloat(mediaG1),
        mediaG2: parseFloat(mediaG2),
        mediaFinal: parseFloat(mediaFinal),
        disciplina,
    };

    // Use fetch API to send data to your server
    fetch('http://localhost:3001/mine', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Nota registrada com sucesso!');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Erro ao registrar a nota.');
    });
}

function consultarNotas() {
    const consultaMatricula = document.getElementById('consultaMatricula').value;

    fetch(`http://localhost:3001/nota?matricula=${consultaMatricula}`)
        .then(response => response.json())
        .then(data => {
            const resultContainer = document.getElementById('resultContainer');
            resultContainer.innerHTML = '';

            if (Array.isArray(data)) {
                // Se data for um array
                if (data.length === 0) {
                    resultContainer.innerHTML = '<p>Nenhuma nota encontrada.</p>';
                } else {
                    data.forEach(nota => {
                        const notaInfo = document.createElement('p');
                        notaInfo.textContent = `Disciplina: ${nota.disciplina}, Média Final: ${nota.mediafinal}`;
                        resultContainer.appendChild(notaInfo);
                    });
                }
            } else if (typeof data === 'object') {
                // Se data for um objeto único, criamos uma lista temporária
                const notaList = [data];
                notaList.forEach(nota => {
                    const notaInfo = document.createElement('p');
                    notaInfo.textContent = `Disciplina: ${nota.disciplina}, Média Final: ${nota.mediafinal}`;
                    resultContainer.appendChild(notaInfo);
                });
            } else {
                // Se a resposta não for um array ou objeto
                console.error('Formato de resposta inesperado:', data);
                alert('Erro ao consultar as notas.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Erro ao consultar as notas.');
        });
}

function consultarNotas() {

    const resultados = [
        { matricula: '123', aluno: 'João', disciplina: 'Matemática', mediaG1: 8.5, mediaG2: 9.0, mediaFinal: 8.8 },
        { matricula: '123', aluno: 'João', disciplina: 'Matemática', mediaG1: 8.5, mediaG2: 9.0, mediaFinal: 8.8 },
        { matricula: '123', aluno: 'João', disciplina: 'Matemática', mediaG1: 8.5, mediaG2: 9.0, mediaFinal: 8.8 },
        { matricula: '123', aluno: 'João', disciplina: 'Matemática', mediaG1: 8.5, mediaG2: 9.0, mediaFinal: 8.8 },
        { matricula: '123', aluno: 'João', disciplina: 'Matemática', mediaG1: 8.5, mediaG2: 9.0, mediaFinal: 8.8 },
        { matricula: '123', aluno: 'João', disciplina: 'Matemática', mediaG1: 8.5, mediaG2: 9.0, mediaFinal: 8.8 },
        { matricula: '123', aluno: 'João', disciplina: 'Matemática', mediaG1: 8.5, mediaG2: 9.0, mediaFinal: 8.8 },

        // Adicione mais resultados conforme necessário
    ];

    const resultContainer = document.getElementById('resultContainer');

    // Limpa o conteúdo anterior
    resultContainer.innerHTML = '';

    // Cria dinamicamente o componente de resultado para cada resultado retornado
    resultados.forEach(resultado => {
        const resultComponent = document.createElement('div');
        resultComponent.classList.add('result-component');

        const resultDetails = document.createElement('div');
        resultDetails.classList.add('result-details');

        // Coluna 1: matricula, aluno e disciplina
        const column1 = document.createElement('div');
        column1.innerHTML = `<p>Matrícula: ${resultado.matricula}</p><p>Aluno: ${resultado.aluno}</p><p>Disciplina: ${resultado.disciplina}</p>`;
        resultDetails.appendChild(column1);

        // Coluna 2: mediaG1, mediaG2 e mediaFinal
        const column2 = document.createElement('div');
        column2.innerHTML = `<p>Média G1: ${resultado.mediaG1}</p><p>Média G2: ${resultado.mediaG2}</p><p>Média Final: ${resultado.mediaFinal}</p>`;
        resultDetails.appendChild(column2);

        resultComponent.appendChild(resultDetails);
        resultContainer.appendChild(resultComponent);
    });
}

