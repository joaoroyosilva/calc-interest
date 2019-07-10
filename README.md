# Microserviço para cálculo de juros e multa.

Serviço publicado no Heroku e pode ser consumido pelo endereço: https://calc-interest-api.herokuapp.com/

Exemplo de requisição:
```
{
	"value":110, //valor inicial do documento
	"fine":2.5, //multa (% ou R$)
	"interest":4.6,  //juros (% ou R$)
	"type_calc":2, //1 - Diário e 2 - Mensal
	"type_interest":2, //1 - Juros Simples e 2 - Juros Composto
	"type_fine":2, //1 - Multa com valor fixo e 2 - Multa Percentual
	"emission":"2019-06-08", //data de emissão do documento
	"maturity":"2019-07-08" //data de vencimento do documento
}
```

Exemplo de retorno:

```
{
  "type": "Compound Interest", //Tipo de juros selecionado
  "total_interest": 313.98, //total do juros
  "total_fine": 2.5, //total da multa
  "original_value": 110, //valor original do documento
  "total": 426.48, //valor atualizado
  "total_charges": 316.48, //total dos encargos
  "period": "30 day(s)" //periodo calculado
}
```
