function submitForm() {
    const matricula = document.getElementById('matricula').value;
    const aluno = document.getElementById('aluno').value;
    const mediaG1 = document.getElementById('mediaG1').value;
    const mediaG2 = document.getElementById('mediaG2').value;
    const mediaFinal = document.getElementById('mediaFinal').value;
    const disciplina = document.getElementById('disciplina').value;
    const key = document.getElementById('chave').value;

    const data = {
        matricula,
        aluno,
        mediaG1: parseFloat(mediaG1),
        mediaG2: parseFloat(mediaG2),
        mediaFinal: parseFloat(mediaFinal),
        disciplina,
    };

    // Use fetch API to send data to your server
    fetch(`http://localhost:3001/mine/${key}`, {
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

function getGrade() {
    const hash = document.getElementById('hash').value;
    const key = document.getElementById('chave_privada').value;

    fetch(`http://localhost:3001/nota/${hash}/${key}`)
        .then(response => response.json())
        .then(data => {
            const resultContainer = document.getElementById('resultContainer');
            resultContainer.innerHTML = '';

            const notaInfo = document.createElement('p');
            console.log('Nota:', data)
            notaInfo.textContent =`Aluno: ${data.aluno}, Disciplina: ${data.disciplina}, Média G1: ${data.mediaG1}, Média G2: ${data.mediaG2}, Média Final: ${data.mediaFinal}`;
            resultContainer.appendChild(notaInfo);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Erro ao consultar as notas.');
        });
}

function getBlockchain() {
    fetch(`http://localhost:3001/blocks`)
        .then(response => response.json())
        .then(data => {
            const resultContainer = document.getElementById('resultContainerBlockchain');
            resultContainer.innerHTML = '';

            for (const block of data) {
                const blockInfo = document.createElement('p');
                blockInfo.textContent = JSON.stringify(block);
                resultContainer.appendChild(blockInfo);
            }
            // const notaInfo = document.createElement('p');
            // console.log('Nota:', data.toString())
            // notaInfo.textContent = data.toString();
            // resultContainer.appendChild(notaInfo);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Erro ao consultar as notas.');
        });
}