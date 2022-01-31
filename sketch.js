//placar do jogo
let meusPontos = 0
let pontosDoOponente = 0

// variaveis bolinha
let xBolinha = 300
let yBolinha = 200
let diametro = 15
let raio = diametro / 2

// velocidade bolinha
let velocidadeXBolinha = 6
let velocidadeYBolinha = 6
let raqueteComprimento = 10
let raqueteAltura = 90

// variaveis raquete
let xRaquete = 5
let yRaquete = 150

// variaveis raquete oponente.
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let chanceDeErrar = 0

let colidiu = false

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload() {
    trilha = loadSound("trilha.mp3");
    ponto = loadSound("ponto.mp3");
    raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop()
}

function draw() {
    background(0);
    incluiPlacar()
    marcaPonto()
    mostraBolinha();
    movimentaBolinha();
    verificaColisaoBorda();
    mostraRaquete(xRaquete, yRaquete);
    mostraRaquete(xRaqueteOponente, yRaqueteOponente);
    movimentaRaquete();
    movimentaRaqueteOponente()
    verificaColisaoRaquete(xRaquete, yRaquete);
    verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente)
    mostraRaquete(xRaqueteOponente, yRaqueteOponente);
}

function mostraBolinha(){
  circle(xBolinha,yBolinha, diametro)
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha
  yBolinha += velocidadeYBolinha
}

function mostraRaquete(x,y) {
    rect(x, y, raqueteComprimento, raqueteAltura);
}


function movimentaRaquete() {
    if (keyIsDown(UP_ARROW)) {
        yRaquete -= 10;
    }
    if (keyIsDown(DOWN_ARROW)) {
        yRaquete += 10;
    }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha -yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

/*function verificaColisaoRaquete() {
    if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio >         yRaquete) {
        velocidadeXBolinha *= -1;
    }
}*/

function verificaColisaoRaquete(x,y) {
    colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
    if (colidiu) {
        velocidadeXBolinha *= -1;
      raquetada.play()
    }
  
}

function verificaColisaoBorda(){
  
  if(xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1
  }
  if(yBolinha + raio > height || yBolinha - raio < 0){
     velocidadeYBolinha *= -1
     }
}

function incluiPlacar() {
    stroke(255);
    textAlign(CENTER);
    textSize(16);
    fill(color(25, 140, 0));
    rect(150, 10, 40, 20);
    fill(255);
    text(meusPontos, 170, 26);
    fill(color(255, 10, 0));
    rect(450, 10, 40, 20);
    fill(255);
    text(pontosDoOponente, 470, 26);
}

function marcaPonto() {
    if (xBolinha > 590) {
        meusPontos += 1
      ponto.play()
    }
    if (xBolinha < 10) {
        pontosDoOponente += 1
      ponto.play()
    }
}