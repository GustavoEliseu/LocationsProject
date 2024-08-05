Projeto de localização do react native.

Devido a problemas o projeto que deveria ter sido realizado em 1 semana foi realizado em aproximadamente 48 horas, logo considere como um MVP.

Algumas funcionalidades ficaram faltando mas me pergunte sobre elas que explico como seriam realizadas, apenas tive problemas de tempo para implementar-las:
Utilizar um background Service Kotlin/Java para que a aplicação consiga acesso a localização mesmo em segundo plano.
Utilizar notificationManager nativo do android para tratar e separar notificações do service, apresentando apenas quando a aplicação estiver em segundo plano.
Testes automatizados não foram adicionados.

Funcionando:
Rastreio de localização
Locais salvos.
Verificação de distancia da localização atual em relação a lista de locais salvos.

Embora a qualidade do produto está abaixo do esperado, considere como se tivesse sido feito em apenas 24 (vide commits).

Bibliotecas utilizadas:
async-storage, geolocation, redux
