class RecintosZoo {
//informações sobre os animais disponíveis no zoológico
  constructor() {
    this.animais = {
      LEAO: { tamanho: 3, biomas: ["savana","savana e rio"] },
      LEOPARDO: { tamanho: 2, biomas: ["savana","savana e rio"] },
      CROCODILO: { tamanho: 3, biomas: ["rio"] },
      MACACO: { tamanho: 1, biomas: ["savana", "floresta","savana e rio"] },
      GAZELA: { tamanho: 2, biomas: ["savana","savana e rio"] },
      HIPOPOTAMO: { tamanho: 4, biomas: ["savana", "rio","savana e rio"] },
    };

    this.recintos = [
      { numero: 1, bioma: "savana", tamanhoTotal: 10, animaisExistentes: ["MACACO", "MACACO", "MACACO"] },
      { numero: 2, bioma: "floresta", tamanhoTotal: 5, animaisExistentes: [] },
      { numero: 3, bioma: "savana e rio", tamanhoTotal: 7, animaisExistentes: ["GAZELA"] },
      { numero: 4, bioma: "rio", tamanhoTotal: 8, animaisExistentes: [] },
      { numero: 5, bioma: "savana", tamanhoTotal: 9, animaisExistentes: ["LEAO"] },
    ];
  }

  analisaRecintos(animal, quantidade) {
    // Valida  animais
    if (!this.animais[animal]) {
      return { erro: "Animal inválido" };
    }

    // Valida cc quantidade
    if (!Number.isInteger(quantidade) || quantidade <= 0) {
      return { erro: "Quantidade inválida" };
    }

    const { tamanho, biomas } = this.animais[animal];
    const recintosViaveis = [];

    // PercorrE O reCIinto  determina SE É COMPATÍVEL
    for (const recinto of this.recintos) {
      const espacoOcupadoExistente = recinto.animaisExistentes.reduce((acc, a) => acc + this.animais[a].tamanho, 0);
      const espacoRestante = recinto.tamanhoTotal - espacoOcupadoExistente;
 
      
 
      // Verifica se o bioma  e o animal compatíveIS
      if (!biomas.includes(recinto.bioma)) {
        continue;
      }


      //  valida animais

      if (["LEAO", "LEOPARDO", "CROCODILO"].includes(animal)) {
      
        if (recinto.animaisExistentes.some(a => a !== animal && ["LEAO", "LEOPARDO", "CROCODILO"].includes(a))) {
          continue;
        }
      }

      
      if (animal === "HIPOPOTAMO" && recinto.animaisExistentes.length > 0 && recinto.bioma !== "savana e rio") {
        continue;
      }

      // Regras para macacos
      if (animal === "MACACO") {
        if (recinto.animaisExistentes.includes("LEAO") || recinto.animaisExistentes.includes("LEOPARDO") || recinto.animaisExistentes.includes("CROCODILO")) {
          continue; // Evita recintos com carnívoros
        }
        if (recinto.animaisExistentes.length === 0 && quantidade === 1) {
          continue; // Evita recintos completamente vazios se for apenas 1 macaco
        }
      }

      // Calcula O espaço necessário e considera espaço extra se houver outra espécie
      const espacoNecessario = tamanho * quantidade + (recinto.animaisExistentes.length > 0 && recinto.animaisExistentes[0] !== animal ? 1 : 0);

      // Verifica se o espaço cabe no recinto
      if (espacoNecessario <= espacoRestante) {
        recintosViaveis.push({ 
          numero: recinto.numero,
          espacoLivre: espacoRestante - espacoNecessario,
          total: recinto.tamanhoTotal
        });
      }
    }

    // Ordena os recintos viáveis pelo número do recinto
    recintosViaveis.sort((a, b) => a.numero - b.numero);

    // Formata a saída 
    const formattedRecintos = recintosViaveis.map(r => `Recinto ${r.numero} (espaço livre: ${r.espacoLivre} total: ${r.total})`);

    // Retornar recintos / mensagem de erro
    if (formattedRecintos.length === 0) {
      return { erro: "Não há recinto viável" };
    } else {
      return { recintosViaveis: formattedRecintos };
    }
  }
}

export { RecintosZoo as RecintosZoo };
