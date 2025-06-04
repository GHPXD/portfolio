📊 Dashboard COVID-19 Brasil
Um dashboard interativo e completo para visualização e análise de dados de COVID-19 no Brasil, oferecendo tanto interface desktop quanto web para máxima flexibilidade de uso.

🌟 Características Principais
📈 Visualizações Interativas: Gráficos de dispersão, barras, evolução temporal e mapas de calor

🔍 Filtros Dinâmicos: Filtragem por estado, cidade e períodos específicos

🖥️ Interface Dupla: Versão desktop (Tkinter) e versão web (Dash)

📊 Métricas Avançadas: Taxa de mortalidade, média móvel, análise de correlações

💾 Exportação: Salvar gráficos em formatos PNG e PDF

📱 Responsivo: Interface web adaptável para diferentes dispositivos

🛠️ Tecnologias Utilizadas
Manipulação de Dados
Pandas: Processamento e análise de dados

NumPy: Cálculos matemáticos e estatísticos

Visualizações
Matplotlib: Gráficos estáticos de alta qualidade

Seaborn: Visualizações estatísticas elegantes

Plotly: Gráficos interativos e dinâmicos

Interfaces
Tkinter: Interface desktop nativa

Dash: Dashboard web interativo

📋 Pré-requisitos
Python 3.7 ou superior

Bibliotecas listadas em requirements.txt

🚀 Instalação
Clone o repositório

bash
git clone https://github.com/seu-usuario/covid-dashboard-brasil.git
cd covid-dashboard-brasil
Crie um ambiente virtual (recomendado)

bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate     # Windows
Instale as dependências

bash
pip install -r requirements.txt
Prepare os dados

Coloque seu arquivo CSV em data/dados_covid_brasil.csv

Ou use os dados de exemplo gerados automaticamente

🎯 Como Usar
Execução Principal
bash
python main.py
Escolha entre:

1: Interface Desktop (Tkinter)

2: Interface Web (Dash)

3: Sair

Interface Desktop
Interface nativa com controles intuitivos

Gráficos integrados usando Matplotlib/Seaborn

Funcionalidade de salvar gráficos localmente

Interface Web
Acesse: http://localhost:8050

Dashboard responsivo e interativo

Gráficos dinâmicos com Plotly

Tabelas de dados ordenáveis

📁 Estrutura do Projeto
text
covid_dashboard/
├── data/
│   └── dados_covid_brasil.csv    # Dados de COVID-19
├── src/
│   ├── __init__.py
│   ├── data_processor.py         # Processamento de dados
│   ├── visualizations.py         # Criação de gráficos
│   ├── tkinter_app.py           # Interface desktop
│   └── dash_app.py              # Interface web
├── requirements.txt              # Dependências
├── main.py                      # Arquivo principal
└── README.md                    # Este arquivo
📊 Funcionalidades Disponíveis
Tipos de Visualizações
Casos vs Mortes por Cidade: Gráfico de dispersão mostrando correlação

Total Mortes por Estado: Ranking dos estados mais afetados

Evolução Temporal: Acompanhamento de casos/mortes ao longo do tempo

Taxa de Mortalidade: Análise comparativa entre estados

Correlação entre Variáveis: Mapa de calor das correlações

Distribuição Geográfica: Visualização por regiões

Filtros e Controles
Estado: Selecione estados específicos ou visualize todos

Cidade: Filtre por cidades dentro do estado selecionado

Período: Defina intervalos de datas para análise

Métricas: Alterne entre casos, mortes e recuperados

Recursos Adicionais
Cards de Resumo: Estatísticas principais em destaque

Tabelas Interativas: Dados detalhados com ordenação

Exportação: Salve gráficos em alta resolução

Dados de Exemplo: Sistema funciona mesmo sem dados reais

📈 Formato dos Dados
O arquivo CSV deve conter as seguintes colunas:

Coluna	Tipo	Descrição
data	Date	Data do registro (YYYY-MM-DD)
pais	String	País (Brasil)
estado	String	Sigla do estado (SP, RJ, MG, etc.)
cidade	String	Nome da cidade
casos	Integer	Número total de casos
mortes	Integer	Número total de mortes
recuperados	Integer	Número de recuperados
Exemplo de Dados
text
data,pais,estado,cidade,casos,mortes,recuperados
2023-01-01,Brasil,SP,São Paulo,15000,450,14000
2023-01-01,Brasil,RJ,Rio de Janeiro,8000,240,7500
🔧 Configuração Avançada
Personalização de Gráficos
Edite src/visualizations.py para:

Alterar cores e estilos

Adicionar novos tipos de gráficos

Modificar layouts e formatação

Adição de Novas Métricas
Modifique src/data_processor.py para:

Calcular novas estatísticas

Implementar filtros personalizados

Adicionar validações de dados

🐛 Solução de Problemas
Erro: "Arquivo não encontrado"
Verifique se o arquivo CSV está em data/dados_covid_brasil.csv

O sistema criará dados de exemplo automaticamente se o arquivo não existir

Erro: "Módulo não encontrado"
bash
pip install -r requirements.txt
Interface web não carrega
Verifique se a porta 8050 está disponível

Tente acessar http://127.0.0.1:8050

Gráficos não aparecem no Tkinter
Instale o backend matplotlib: pip install matplotlib

No Linux: sudo apt-get install python3-tk

🤝 Contribuição
Faça um fork do projeto

Crie uma branch para sua feature (git checkout -b feature/AmazingFeature)

Commit suas mudanças (git commit -m 'Add some AmazingFeature')

Push para a branch (git push origin feature/AmazingFeature)

Abra um Pull Request

📝 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

👥 Autores
Guilherme Henrique Pereira

⭐ Se este projeto foi útil para você, considere dar uma estrela no GitHub!# Pycovid
