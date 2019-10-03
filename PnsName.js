/*:

  @plugindesc Modificando um pouco o sistema de nome
  @author O cara dos sinais
 
  @param Mensagem
  @desc The message displayed on the first line of the help window when using Keyboard Mode.
  @default Escolha um nome
 
  @param Fundo 
  @desc 'true'   - Mostra a windowskin atras da janela
  'false'  - Não mostra a windowskin da janela
  @default true

  @param Sujestao 
  @desc 'true'   - Mostra o botão sujestão
  'false'  - Não mostra o botão sujestão
  @default true

   @param Coordenada X
   @desc Coordenada vertical em pixels de onde vai ficar a janela
   @default 0
 
   @param Coordenada Y
   @desc Coordenada horizontal em pixels de onde vai ficar a janela
   @default 150

   @param Icone ok
   @desc Id do icone antes do botão ok
   @default 74

   @param Icone sujestao
   @desc Id do icone antes do botão sujestao
   @default 297

   @param Cor dos botoes 
   @desc  A cor dos botões que aparecem em baixo do nome
   @default #2287aa

   @param Sujestao hero 1
   @desc Sujestão de nomes do herói 1. Separar por virgula
   @default Miguel, Guilherme, Geovani, Rafael, Samuel

   @param Sujestao hero 2
   @desc Sujestão de nomes do herói 2. Separar por virgula
   @default Luiza, Valentina, Isis, Nicole, Rafaela

   @param Sujestao hero 3
   @desc Sujestão de nomes do herói 3. Separar por virgula
   @default Biscoito, Bolacha

   @param Sujestao hero 4
   @desc Sujestão de nomes do herói 4. Separar por virgula
   @default Lasanha, Strogonoff

   @param Sujestao hero 5
   @desc Sujestão de nomes do herói 5. Separar por virgula
   @default Cachorro, Gato

   @param Sujestao hero 6
   @desc Sujestão de nomes do herói 6. Separar por virgula
   @default Verão, Inverno, Primavera, Outono

   @param Sujestao hero 7
   @desc Sujestão de nomes do herói 7. Separar por virgula
   @default Venus, Marte, Terra, Saturno, Urano, Jupiter, Netuno

   @param Sujestao hero 8
   @desc Sujestão de nomes do herói 8. Separar por virgula
   @default Batman, Superman

   @param Sujestao hero 9
   @desc Sujestão de nomes do herói 9. Separar por virgula
   @default Marvel, DC

   @param Sujestao hero 10
   @desc Sujestão de nomes do herói 10. Separar por virgula
   @default Ketchup, Mostarda

   @param Sujestao hero 11
   @desc Sujestão de nomes do herói 11. Separar por virgula
   @default Dia, Noite

   @param Sujestao hero 12
   @desc Sujestão de nomes do herói 12. Separar por virgula
   @default Água, Terra, Fogo, Ar

   @param Sujestao hero 13
   @desc Sujestão de nomes do herói 13. Separar por virgula
   @default Açucar, Tempero, Tudo de bom

   @param Sujestao hero 14
   @desc Sujestão de nomes do herói 14. Separar por virgula
   @default Auron, Zoroak, Lia, Eric, Jefenir, Elix, Horacio, Garon
*/


(function(pns){

	var letras = "abcdefghijklmnopqrstuvwxyzç";
	var vogal = "aeiou";
	var numeros =  "0123456789";
	var simbolo = "),!,@,#,$,%,,&,*,("; 
	var acento = '';
	var escolheuAcento = false;
	var suj = [
		String(PluginManager.parameters('PnsName')['Sujestao hero 1']),
		String(PluginManager.parameters('PnsName')['Sujestao hero 2']),
		String(PluginManager.parameters('PnsName')['Sujestao hero 3']),
		String(PluginManager.parameters('PnsName')['Sujestao hero 4']),
		String(PluginManager.parameters('PnsName')['Sujestao hero 5']),
		String(PluginManager.parameters('PnsName')['Sujestao hero 6']),
		String(PluginManager.parameters('PnsName')['Sujestao hero 7']),
		String(PluginManager.parameters('PnsName')['Sujestao hero 8']),
		String(PluginManager.parameters('PnsName')['Sujestao hero 9']),
		String(PluginManager.parameters('PnsName')['Sujestao hero 10']),
		String(PluginManager.parameters('PnsName')['Sujestao hero 11']),
		String(PluginManager.parameters('PnsName')['Sujestao hero 12']),
		String(PluginManager.parameters('PnsName')['Sujestao hero 13']),
		String(PluginManager.parameters('PnsName')['Sujestao hero 14'])
	];
	var sujIndex = 0;

	var descricao = String(PluginManager.parameters('PnsName')['Mensagem']);
	var cordenadaX = Number(PluginManager.parameters('PnsName')['Coordenada X']);
	var cordenadaY = Number(PluginManager.parameters('PnsName')['Coordenada Y']);
	var transparente = String(PluginManager.parameters('PnsName')['Fundo']).trim().toLowerCase() === 'true';
	var sujestao = String(PluginManager.parameters('PnsName')['Sujestao']).trim().toLowerCase() === 'true';
	var corBotao = String(PluginManager.parameters('PnsName')['Cor dos botoes']);
	var botao1 = Number(PluginManager.parameters('PnsName')['Icone ok']);
	var botao2 = Number(PluginManager.parameters('PnsName')['Icone sujestao']); 

	Input.resetAllKeystrokes = function() {
		for(var i = 0; i < this._currentState.length; i++) {
			if(this._currentState[i]) this._currentState[i] = false;
		}
	};

	Scene_Name.prototype.CarregarLetras = function() {
		Input.keyMapper[8] = "back";
		Input.keyMapper[13] = "enter";
		Input.keyMapper[32] = "espaco";
		Input.keyMapper[37] = "esquerda";
		Input.keyMapper[38] = "cima";
		Input.keyMapper[39] = "direita";
		Input.keyMapper[40] = "baixo";
		Input.keyMapper[46] = "del";
		Input.keyMapper[186] = "ç";
		Input.keyMapper[219] = "agudo";
		Input.keyMapper[222] = "tio";

		for(var i = 48; i <= 57; i++) {
			Input.keyMapper[i] = numeros.substring(i-48,i-47);
		}
		
		for(var i = 65; i <= 90; i++) {
			Input.keyMapper[i] = letras.substring(i-65,i-64);
		}		
		this._letrasSetadas = true;
		Input.resetAllKeystrokes();
	}

	var _Scene_Name_create = Scene_Name.prototype.create;
	Scene_Name.prototype.create = function() {
		_Scene_Name_create.call(this);
		this._windowLayer.removeChild(this._inputWindow);
		this._editWindow.x += cordenadaX;
		this._editWindow.y += cordenadaY;
		this._editWindow.opacity = transparente ? 255 : 0;
		this._letrasSetadas = false;
		this._shift = false;
		this.CarregarLetras();
	};

	var _Scene_Name_popScene = Scene_Name.prototype.popScene
	Scene_Name.prototype.popScene = function() {
		Input.keyMapper[8] = "backspace";
		Input.keyMapper[9] = 'tab';    
		Input.keyMapper[13] = 'ok';      
		Input.keyMapper[16] = 'shift';   
		Input.keyMapper[17] = 'control'; 
		Input.keyMapper[18] = 'control'; 
		Input.keyMapper[27] = 'escape';  
		Input.keyMapper[32] = 'ok';      
		Input.keyMapper[33] = 'pageup';  
		Input.keyMapper[34] = 'pagedown';
		Input.keyMapper[37] = 'left';    
		Input.keyMapper[38] = 'up';      
		Input.keyMapper[39] = 'right';   
		Input.keyMapper[40] = 'down';    
		Input.keyMapper[45] = 'escape';  
		Input.keyMapper[81] = 'pageup';  
		Input.keyMapper[87] = 'pagedown';
		Input.keyMapper[88] = 'escape';  
		Input.keyMapper[90] = 'ok';      
		Input.keyMapper[96] = 'escape';  
		Input.keyMapper[98] = 'down';    
		Input.keyMapper[100] = 'left';   
		Input.keyMapper[102] = 'right';  
		Input.keyMapper[104] = 'up';     
		Input.keyMapper[120] = 'debug';
		Input.resetAllKeystrokes();
		_Scene_Name_popScene.call(this);
	};

	Scene_Name.prototype.checkKeyInput = function() {
		this._shift = Input.isPressed("shift");
		
		for(var i = 0; i < letras.length; i++) {
			var letr = letras.substring(i,i+1);			
			if(Input.isTriggered(letr)) {	
				letr = this.letraComAcento(letr);			
				if(this._shift) letr = letr.toUpperCase();
				this._editWindow.add(letr);
				this._editWindow.refresh();
			}
		}
		for(var i = 0; i < numeros.length; i++) {
			var num = numeros.substring(i,i+1);
			if(Input.isTriggered(num)) {
				if(this._shift) num = simbolo.split(',')[i,i+1];
				this._editWindow.add(num);
				this._editWindow.refresh();
			}
		}
		if(Input.isTriggered("enter")) {
			if(this._editWindow._name.length > 0){
				SoundManager.playOk();
				this.onInputOk();
			}else{
				SoundManager.playBuzzer();
			}	
		}
		if(Input.isTriggered("espaco")) {
			this._editWindow.add(" ");
			this._editWindow.refresh();
		}
		if(Input.isTriggered("direita")) {
			this._editWindow.direita();
		}
		if(Input.isTriggered("esquerda")) {
			this._editWindow.esquerda();
		}
		if(Input.isTriggered("baixo")) {
			this.sujestaoAnterior();
		}
		if(Input.isTriggered("cima")) {
			this.proximaSujestao();
		}
		if(Input.isTriggered("del")) {
			this._editWindow.del();			
		}
		if(Input.isTriggered("back")) {
			escolheuAcento = false;
			this._editWindow.back();
			this._editWindow.refresh();
		}
		if(Input.isTriggered("6") && this._shift) {
			escolheuAcento = true;
			acento = 'trena';
		}
		if(Input.isTriggered("agudo")) {
			escolheuAcento = true;
			this._shift ? acento = 'agudo2' : acento = 'agudo';
		}
		if(Input.isTriggered("tio")) {
			escolheuAcento = true;
			this._shift ? acento = 'chapeu' : acento = 'tio';
		}

		if(TouchInput.isReleased() ){	
			//Clicou em ok		
			if(TouchInput.x >= cordenadaX + 500 && TouchInput.y >= cordenadaY + 150 &&
			   TouchInput.x <= cordenadaX + 660 && TouchInput.y <= cordenadaY + 190 ){
				if(this._editWindow._name.length > 0){
					SoundManager.playOk();
					this.onInputOk();
				}else{
					SoundManager.playBuzzer();
				}	
			}
			//Clicou em sujestão		
			if(TouchInput.x >= cordenadaX + 340 && TouchInput.y >= cordenadaY + 150 &&
			   TouchInput.x <= cordenadaX + 490 && TouchInput.y <= cordenadaY + 290 && sujestao){
			  	this.proximaSujestao();
			}
		};
	};

	Scene_Name.prototype.proximaSujestao = function() {
		SoundManager.playCursor();
		this._editWindow.LimparTudo();
		if(sujIndex >= suj[this._actor._actorId - 1].split(',').length) sujIndex = 0; 
		this._editWindow.add(suj[this._actor._actorId - 1].split(',')[sujIndex].trim());
		sujIndex++;			  
		this._editWindow._index = this._editWindow._name.length;
		this._editWindow.refresh();
	};

	Scene_Name.prototype.sujestaoAnterior = function() {
		SoundManager.playCursor();
		this._editWindow.LimparTudo();
		if(sujIndex <= 0) sujIndex = suj[this._actor._actorId - 1].split(',').length; 
		sujIndex--;	
		this._editWindow.add(suj[this._actor._actorId - 1].split(',')[sujIndex].trim());				  
		this._editWindow._index = this._editWindow._name.length;
		this._editWindow.refresh();
	};

	Scene_Name.prototype.letraComAcento = function(code) {
		if(vogal.indexOf(code) > -1 && escolheuAcento){
			if(code == 'a' && acento == 'tio') code = 'ã';
			if(code == 'a' && acento == 'chapeu') code = 'â';
			if(code == 'a' && acento == 'agudo') code = 'á';
			if(code == 'a' && acento == 'agudo2') code = 'à';

			if(code == 'e' && acento == 'chapeu') code = 'ê';
			if(code == 'e' && acento == 'agudo') code = 'é';
			if(code == 'e' && acento == 'agudo2') code = 'è';

			if(code == 'i' && acento == 'chapeu') code = 'î';
			if(code == 'i' && acento == 'agudo') code = 'í';
			if(code == 'i' && acento == 'agudo2') code = 'ì';

			if(code == 'o' && acento == 'tio') code = 'õ';
			if(code == 'o' && acento == 'chapeu') code = 'ô';
			if(code == 'o' && acento == 'agudo') code = 'ó';
			if(code == 'o' && acento == 'agudo2') code = 'ò';

			if(code == 'u' && acento == 'trena') code = 'ü';
			if(code == 'u' && acento == 'chapeu') code = 'û';
			if(code == 'u' && acento == 'agudo') code = 'ú';
			if(code == 'u' && acento == 'agudo2') code = 'ù';
		}
		escolheuAcento = false;
		return code;
	};

	var _Scene_Name_update = Scene_Name.prototype.update;
	Scene_Name.prototype.update = function() {
		_Scene_Name_update.call(this);
		this.checkKeyInput();
	};

	var _Scene_Name_createInputWindow = Scene_Name.prototype.createInputWindow;
	Scene_Name.prototype.createInputWindow = function() {
	    _Scene_Name_createInputWindow.call(this);
	    this._inputWindow.opacity = 255;
	};

	Window_NameEdit.prototype.windowHeight = function() {
	    return (true) ? this.fittingHeight(4) : this.fittingHeight(2);
	};

	Window_NameEdit.prototype.itemRect = function(index) {
	    return {
	        x: this.left() + index * this.charWidth(),
	        y: (true) ? 54 : 18,
	        width: this.charWidth(),
	        height: this.lineHeight()
	    };
	};

	Window_NameEdit.prototype.drawChar = function(index) {
	    var rect = this.itemRect(index);
	    this.drawText(this._name[index] || '', rect.x, rect.y);
	};

	var _Window_NameEdit_faceWidth = Window_NameEdit.prototype.faceWidth;
	Window_NameEdit.prototype.faceWidth = function() {
	    return (true) ? _Window_NameEdit_faceWidth.call(this) : 0;
	};

	Window_NameEdit.prototype.LimparTudo = function() {
		this._name = '';
		this._index = 0;
		this.refresh();
	};

	Window_NameEdit.prototype.refresh = function() {
	    this.contents.clear();
	    this.drawActorFace(this._actor, 0, 0);
	    for (var i = 0; i < this._maxLength; i++) {
	        this.drawUnderline(i);
	    }
	    for (var j = 0; j < this._name.length; j++) {
	        this.drawChar(j);
	    }
	    var rect = this.itemRect(this._index);
		this.setCursorRect(rect.x, rect.y, rect.width, rect.height);

		this.changeTextColor('white');
		this.drawText(descricao, 155, 0, 300, 'left');

		//Ok
		this.drawIcon(botao1, 320, 102);	
        this.changeTextColor(corBotao);
		this.drawText("OK", 360, 100, 300, 'left');
		//Sujestão
		if(sujestao){
			this.drawIcon(botao2, 155, 102);	
			this.drawText("Sugestão", 195, 100, 300, 'left');
			this.changeTextColor('white');
		}		
	};

	Window_NameEdit.prototype.add = function(ch) {
		if (this._index < this._maxLength && this._maxLength > this._name.length) {
			this._name = this._name.substr(0, this._index) + ch + this._name.substr(this._index)
			if (this._index < this._maxLength - 1) this._index++;
			this.refresh();
			return true;
		} else {
			return false;
		}
	};
	
	Window_NameEdit.prototype.back = function() {
		if (this._index > 0) {
			this._index--;
			this._name = this._name.substr(0, this._index) + this._name.substr(this._index + 1)
			this.refresh();
			return true;
		} else {
			return false;
		}
	};

	Window_NameEdit.prototype.del = function() {
		if (this._index >= 0) {
			this._name = this._name.substr(0, this._index) + this._name.substr(this._index + 1)
			this.refresh();
			return true;
		} else {
			return false;
		}
	};

	Window_NameEdit.prototype.direita = function(ch) {
		if (this._index < this._maxLength - 1 && this._index < this._name.length) {
			this._index++;
			this.refresh();
		}
	};
	
	Window_NameEdit.prototype.esquerda = function() {
		if (this._index > 0) {
			this._index--;
			this.refresh();
		}
	};

})();
