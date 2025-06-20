const fs = require("fs"); // Módulo 'fs' para manipulação de arquivos do sistema de arquivos.

class GerenciadorDeConjuntos {
  // O construtor inicializa a estrutura para um dado número de vértices.
  constructor(numVertices) {
    this.parent = new Array(numVertices + 1).fill(0).map((_, i) => i);
    this.rank = new Array(numVertices + 1).fill(0);
  }

  find(i) {
    // Se 'i' é seu próprio pai, ele é o representante do conjunto.
    if (this.parent[i] === i) {
      return i;
    }
    // Caso contrário, recursivamente encontra o pai da raiz e faz 'i' apontar diretamente para esse pai.
    this.parent[i] = this.find(this.parent[i]);
    return this.parent[i];
  }

  union(i, j) {
    let rootI = this.find(i); // Encontra o representante do vértice 'i'.
    let rootJ = this.find(j); // Encontra o representante do vértice 'j'.

    if (rootI !== rootJ) {
      if (this.rank[rootI] < this.rank[rootJ]) {
        this.parent[rootI] = rootJ;
      } else if (this.rank[rootI] > this.rank[rootJ]) {
        this.parent[rootJ] = rootI;
      } else {
        this.parent[rootJ] = rootI;
        this.rank[rootI]++;
      }
      return true; // A união foi bem-sucedida.
    }
    return false; // Os vértices já estavam no mesmo conjunto, não há necessidade de união.
  }
}

// Função para converter dados do formato DIMACS para Lista de Adjacência
function converterDimacsParaListaAdjacencia(conteudo) {
  // Divide o conteúdo em linhas e remove espaços em branco extras do início/fim.
  const linhas = conteudo.trim().split("\n");

  // Verifica se o arquivo tem pelo menos a linha de cabeçalho.
  if (linhas.length === 0 || linhas[0].trim() === "") {
    console.warn("O arquivo DIMACS está vazio ou mal formatado.");
    return { listaAdjacencia: {}, numVertices: 0 };
  }

  const primeiraLinha = linhas[0].split(" ").map(Number);
  const numVerticesDeclarado = primeiraLinha[0]; // Número de vértices declarado no arquivo.
  // const numArestasDeclarado = primeiraLinha[1]; // Não precisamos do número de arestas aqui.

  const listaAdjacencia = {};
  // Variável para rastrear o maior ID de vértice que realmente aparece nas arestas.
  let maxVerticeEncontrado = 0;

  // Preenche a lista de adjacência com arrays vazios para cada vértice até o número declarado.
  for (let i = 1; i <= numVerticesDeclarado; i++) {
    listaAdjacencia[i] = [];
  }

  // Itera sobre as linhas restantes do arquivo, que representam as arestas.
  for (let i = 1; i < linhas.length; i++) {
    const linhaAresta = linhas[i].trim();
    if (linhaAresta === "") continue; // Pula linhas em branco, se houver.

    // Divide cada linha de aresta em origem, destino e peso, convertendo-os para números.
    const [origem, destino, peso] = linhaAresta.split(" ").map(Number);

    // Validação básica para garantir que os valores são numéricos e válidos.
    if (isNaN(origem) || isNaN(destino) || isNaN(peso)) {
      console.warn(
        `Linha ${i + 1} do arquivo contém dados inválidos: "${
          linhas[i]
        }". Pulando.`
      );
      continue;
    }

    if (!listaAdjacencia[origem]) {
      listaAdjacencia[origem] = []; // Cria o array se o vértice não foi declarado no cabeçalho.
      console.warn(
        `Vértice de origem ${origem} encontrado em aresta, mas não declarado na primeira linha.`
      );
    }
    listaAdjacencia[origem].push({ destino: destino, peso: peso });

    // Garante que o vértice de destino existe na lista.
    if (!listaAdjacencia[destino]) {
      listaAdjacencia[destino] = []; // Cria o array se o vértice não foi declarado no cabeçalho.
      console.warn(
        `Vértice de destino ${destino} encontrado em aresta, mas não declarado na primeira linha.`
      );
    }
    listaAdjacencia[destino].push({ destino: origem, peso: peso });

    // Atualiza o maior ID de vértice encontrado até agora.
    maxVerticeEncontrado = Math.max(maxVerticeEncontrado, origem, destino);
  }

  const finalNumVertices = Math.max(numVerticesDeclarado, maxVerticeEncontrado);
  return { listaAdjacencia, numVertices: finalNumVertices };
}

// Algoritmo de Kruskal para (AGM)
function kruskal(listaAdjacencia, numVertices) {
  const arestas = []; // Array que armazenará todas as arestas do grafo.
  // Um Set para evitar adicionar arestas duplicadas (pois o grafo é não direcionado, 1-2 é igual a 2-1).
  const arestasAdicionadas = new Set();

  for (const verticeOrigemStr in listaAdjacencia) {
    // Itera sobre cada vértice na lista de adjacência (chaves são strings).
    const u = parseInt(verticeOrigemStr); // Converte o ID do vértice de string para número.

    // Apenas processa se o vértice realmente tiver vizinhos.
    if (listaAdjacencia[u] && listaAdjacencia[u].length > 0) {
      for (const vizinho of listaAdjacencia[u]) {
        // Itera sobre cada vizinho do vértice 'u'.
        const v = vizinho.destino; // O vértice de destino da aresta.
        const peso = vizinho.peso; // O peso da aresta.

        // Cria uma chave única para a aresta (garante que {u:1, v:2} e {u:2, v:1} resultem na mesma chave).
        const arestaChave = u < v ? `${u}-${v}` : `${v}-${u}`;
        // Se a aresta ainda não foi adicionada ao Set de controle.
        if (!arestasAdicionadas.has(arestaChave)) {
          arestas.push({ u, v, peso }); // Adiciona a aresta ao array de arestas.
          arestasAdicionadas.add(arestaChave); // Marca a aresta como adicionada.
        }
      }
    }
  }

  arestas.sort((a, b) => a.peso - b.peso);

  const agm = []; // Array que armazenará as arestas que formam a Árvore Geradora Mínima.
  let custoTotal = 0; // Variável para acumular o custo total das arestas na AGM.

  const numVerticesParaGerenciador = Math.max(1, numVertices);
  // Cria uma instância do nosso GerenciadorDeConjuntos para rastrear os componentes conectados.
  const gerenciadorDeConjuntos = new GerenciadorDeConjuntos(
    numVerticesParaGerenciador
  );

  let arestasCount = 0; // Contador de arestas já adicionadas à AGM.

  for (const aresta of arestas) {
    if (gerenciadorDeConjuntos.union(aresta.u, aresta.v)) {
      agm.push(aresta); // Adiciona a aresta à AGM.
      custoTotal += aresta.peso; // Soma o peso da aresta ao custo total.
      arestasCount++; // Incrementa o contador de arestas na AGM.

      if (numVertices > 1 && arestasCount === numVertices - 1) {
        break;
      }
    }
  }
  return { agm, custoTotal }; // Retorna a AGM e seu custo total.
}

function prim(listaAdjacencia, numVertices) {
  // Se não há vértices, retorna AGM vazia.
  if (numVertices === 0) {
    return { agm: [], custoTotal: 0 };
  }

  const chaves = new Array(numVertices + 1).fill(Number.MAX_SAFE_INTEGER);
  const mstSet = new Array(numVertices + 1).fill(false);
  const pai = new Array(numVertices + 1).fill(-1);

  const agm = []; // Array para armazenar as arestas que formam a AGM.
  let custoTotal = 0; // Variável para acumular o custo total das arestas na AGM.
  let arestasCount = 0; // Contador de arestas adicionadas à AGM.

  chaves[1] = 0;

  for (let count = 0; count < numVertices; count++) {
    let u = -1; // Variável para armazenar o vértice 'u' que será adicionado à AGM nesta iteração.
    let minKey = Number.MAX_SAFE_INTEGER; // Variável para encontrar a menor chave (peso) entre os vértices não incluídos.

    for (let v = 1; v <= numVertices; v++) {
      if (mstSet[v] === false && chaves[v] < minKey) {
        minKey = chaves[v]; // Atualiza a menor chave encontrada.
        u = v; // Define 'u' como o vértice com essa menor chave.
      }
    }

    mstSet[u] = true;

    // Se 'u' não for o vértice inicial (ou seja, ele tem um predecessor),
    // adiciona a aresta que conectou 'pai[u]' a 'u' na AGM.
    if (pai[u] !== -1) {
      agm.push({ u: pai[u], v: u, peso: chaves[u] }); // Adiciona a aresta à AGM.
      custoTotal += chaves[u]; // Soma o peso da aresta ao custo total.
      arestasCount++; // Incrementa o contador de arestas na AGM.
    }

    if (listaAdjacencia[u]) {
      for (const vizinho of listaAdjacencia[u]) {
        const v = vizinho.destino;
        const pesoAresta = vizinho.peso;
        if (v <= numVertices && mstSet[v] === false && pesoAresta < chaves[v]) {
          chaves[v] = pesoAresta; // Atualiza a chave de 'v' com o novo peso mínimo.
          pai[v] = u; // Define 'u' como o predecessor de 'v' na AGM (a aresta de menor custo).
        }
      }
    }
  }
  return { agm, custoTotal }; // Retorna a AGM e seu custo total.
}

const nomeArquivo = "meu_grafo.txt"; // Define o nome do arquivo DIMACS a ser lido.

// Lê o conteúdo do arquivo de forma assíncrona.
fs.readFile(nomeArquivo, "utf8", (err, data) => {
  const { listaAdjacencia, numVertices } =
    converterDimacsParaListaAdjacencia(data);

  // Validação para garantir que há vértices no grafo antes de tentar executar os algoritmos.
  if (numVertices === 0) {
    console.log(
      "Nenhum vértice encontrado no grafo. Não é possível executar os algoritmos."
    );
    return;
  }

  console.log("--- Lista de Adjacência ---\n");
  // Exibe a lista de adjacência formatada.
  // Itera sobre os pares chave-valor (vértice e sua lista de vizinhos) do objeto listaAdjacencia.
  for (const [vertice, vizinhos] of Object.entries(listaAdjacencia)) {
    console.log(
      `   Vértice ${vertice}: ${vizinhos
        .map((v) => `{destino: ${v.destino}, peso: ${v.peso}}`) // Formata cada vizinho para exibição.
        .join(", ")}` // Junta as strings dos vizinhos com ", ".
    );
  }

  // --- Executar o Algoritmo de Kruskal ---
  console.log("\n--- Executando o Algoritmo de Kruskal ---");
  const resultadoKruskal = kruskal(listaAdjacencia, numVertices);

  console.log("\nÁrvore Geradora Mínima (AGM) - Kruskal:");
  if (resultadoKruskal.agm.length > 0) {
    // Exibe as arestas que compõem a AGM encontrada pelo Kruskal.
    resultadoKruskal.agm.forEach((aresta) => {
      console.log(
        `   Aresta: ${aresta.u} -- ${aresta.v}, Peso: ${aresta.peso}`
      );
    });
    console.log(
      `\nCusto Total da AGM (Kruskal): ${resultadoKruskal.custoTotal}`
    );
  }

  // --- Executar o Algoritmo de Prim ---
  console.log("\n--- Executando o Algoritmo de Prim ---");
  const resultadoPrim = prim(listaAdjacencia, numVertices);

  console.log("\nÁrvore Geradora Mínima (AGM) - Prim:");
  if (resultadoPrim.agm.length > 0) {
    // Exibe as arestas que compõem a AGM encontrada pelo Prim.
    resultadoPrim.agm.forEach((aresta) => {
      console.log(
        `   Aresta: ${aresta.u} -- ${aresta.v}, Peso: ${aresta.peso}`
      );
    });
    console.log(`\nCusto Total da AGM (Prim): ${resultadoPrim.custoTotal}`);
  }

  if (
    resultadoKruskal.agm.length === resultadoPrim.agm.length &&
    resultadoKruskal.custoTotal === resultadoPrim.custoTotal
  ) {
    console.log("\nAmbos os algoritmos encontraram a mesma AGM.");
  } else {
    console.log("\nOs algoritmos encontraram AGMs diferentes.");
  }

  console.log(
    "\nO Agoritmo de PRIM foi mais pratico, pois sua lógica é mais direta e por ele partir de um ponto inicial"
  );
});
