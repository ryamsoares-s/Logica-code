const fs = require("fs"); // Módulo 'fs' para manipulação de arquivos

// --- Estrutura Union-Find (Disjoint Set Union) ---
class UnionFind {
  constructor(numVertices) {
    this.parent = new Array(numVertices + 1).fill(0).map((_, i) => i); // Cada vértice é inicialmente seu próprio pai
    this.rank = new Array(numVertices + 1).fill(0); // Para otimização (união por rank)
  }

  // Encontra o representante (raiz) do conjunto ao qual 'i' pertence
  find(i) {
    if (this.parent[i] === i) {
      return i;
    }
    this.parent[i] = this.find(this.parent[i]); // Compressão de caminho
    return this.parent[i];
  }

  // Une os conjuntos de 'i' e 'j'
  union(i, j) {
    let rootI = this.find(i);
    let rootJ = this.find(j);

    if (rootI !== rootJ) {
      // União por rank para manter a árvore "achatada"
      if (this.rank[rootI] < this.rank[rootJ]) {
        this.parent[rootI] = rootJ;
      } else if (this.rank[rootI] > this.rank[rootJ]) {
        this.parent[rootJ] = rootI;
      } else {
        this.parent[rootJ] = rootI;
        this.rank[rootI]++;
      }
      return true; // Os conjuntos foram unidos
    }
    return false; // Já estavam no mesmo conjunto
  }
}

// --- Função para converter formato DIMACS para Lista de Adjacência ---
function converterDimacsParaListaAdjacencia(conteudo) {
  const linhas = conteudo.trim().split("\n");
  const primeiraLinha = linhas[0].split(" ").map(Number);
  const numVertices = primeiraLinha[0];
  // const numArestas = primeiraLinha[1]; // Não precisamos de numArestas aqui

  const listaAdjacencia = {};
  for (let i = 1; i <= numVertices; i++) {
    listaAdjacencia[i] = [];
  }

  // Extrair arestas únicas e construir a lista de adjacência
  // Precisamos também do número total de vértices para Kruskal
  let maxVertice = 0;
  for (let i = 1; i < linhas.length; i++) {
    const [origem, destino, peso] = linhas[i].split(" ").map(Number);
    listaAdjacencia[origem].push({ destino: destino, peso: peso });
    listaAdjacencia[destino].push({ destino: origem, peso: peso }); // Para grafo não direcionado
    maxVertice = Math.max(maxVertice, origem, destino);
  }

  return { listaAdjacencia, numVertices: maxVertice }; // Retornar também o número de vértices
}

// --- Algoritmo de Kruskal ---
function kruskal(listaAdjacencia, numVertices) {
  const arestas = [];
  const arestasAdicionadas = new Set(); // Para evitar arestas duplicadas (ex: 1-2 e 2-1)

  // 1. Coletar todas as arestas com seus pesos
  for (const verticeOrigem in listaAdjacencia) {
    for (const vizinho of listaAdjacencia[verticeOrigem]) {
      const u = parseInt(verticeOrigem);
      const v = vizinho.destino;
      const peso = vizinho.peso;

      // Cria uma chave única para a aresta (garante que 1-2 é o mesmo que 2-1)
      const arestaChave = u < v ? `${u}-${v}` : `${v}-${u}`;
      if (!arestasAdicionadas.has(arestaChave)) {
        arestas.push({ u, v, peso });
        arestasAdicionadas.add(arestaChave);
      }
    }
  }

  // 2. Ordenar as arestas por peso em ordem crescente
  arestas.sort((a, b) => a.peso - b.peso);

  const agm = []; // Árvore Geradora Mínima
  let custoTotal = 0;
  const unionFind = new UnionFind(numVertices);
  let arestasCount = 0;

  // 3. Iterar pelas arestas ordenadas e construir a AGM
  for (const aresta of arestas) {
    if (unionFind.union(aresta.u, aresta.v)) {
      // Se a união for bem-sucedida (não formou ciclo)
      agm.push(aresta);
      custoTotal += aresta.peso;
      arestasCount++;

      // Uma AGM com 'N' vértices terá 'N-1' arestas
      if (arestasCount === numVertices - 1) {
        break;
      }
    }
  }

  // Verificar se todos os vértices foram conectados
  if (arestasCount !== numVertices - 1 && numVertices > 1) {
    console.warn(
      "O grafo pode não ser conectado, ou a AGM não pode ser formada para todos os vértices."
    );
  }

  return { agm, custoTotal };
}

// --- Uso principal ---
const nomeArquivo = "meu_grafo.txt";

fs.readFile(nomeArquivo, "utf8", (err, data) => {
  if (err) {
    console.error("Erro ao ler o arquivo:", err.path);
    return;
  }

  const { listaAdjacencia, numVertices } =
    converterDimacsParaListaAdjacencia(data);

  console.log("Lista de Adjacência:\n");
  for (const [vertice, vizinhos] of Object.entries(listaAdjacencia)) {
    console.log(
      `   Vértice ${vertice}: ${vizinhos
        .map((v) => `{destino: ${v.destino}, peso: ${v.peso}}`)
        .join(", ")}`
    );
  }
  console.log(`\n Número total de vértices ${numVertices}`);

  // --- Executar o Algoritmo de Kruskal ---
  console.log("\n--- Executando o Algoritmo de Kruskal ---");
  const resultadoKruskal = kruskal(listaAdjacencia, numVertices);

  console.log("\nÁrvore Geradora Mínima (AGM):");

  resultadoKruskal.agm.forEach((aresta) => {
    console.log(`   Aresta: ${aresta.u} -- ${aresta.v}, Peso: ${aresta.peso}`);
  });
  console.log(`\nCusto Total da AGM: ${resultadoKruskal.custoTotal}`);
});
