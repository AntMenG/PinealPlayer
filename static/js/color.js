var picCont = document.getElementById('pic'),
	image = picCont.getElementsByTagName('img')[0];
	
const toDataURL = url => fetch(url)
.then(response => response.blob())
.then(blob => new Promise((resolve, reject) => {
	const reader = new FileReader()
	reader.onloadend = () => resolve(reader.result)
	reader.onerror = reject
	reader.readAsDataURL(blob)
}));

function createPath (item, url) {
	toDataURL(url).then(dataUrl => {
		if (dataUrl) {
			music[item].pic = dataUrl;
			console.log('cover path');
		}
	})
}

image.addEventListener('load', function() {
	var vibrantHex;
	var musicId = image.getAttribute('data-id');
	if(music[musicId].color) {
		vibrantHex = music[musicId].color
	} else {
		var vibrant = new Vibrant(image);
		var swatches = vibrant.swatches();
		if (swatches.hasOwnProperty('Vibrant') && swatches['Vibrant']) {
			vibrantHex = swatches['Vibrant'].getHex();
		} else {
			vibrantHex = 'cadetblue'
		}
		console.log(`color: ${vibrantHex};`);
		if (!image.getAttribute('data-error') == '1') {
			music[musicId].color = vibrantHex;
			storage.set('music', music, function(error) {
				if (error) throw error;
				console.log("saved");
			});
		}
	}
	document.getElementById('player').style = `background: ${vibrantHex};`;
	var color = document.getElementsByClassName('color');
	var background = document.getElementsByClassName('background');
	for (var i = 0; i < color.length; i++) {
		color[i].style = `color: ${vibrantHex};`;
	}
	for (var i = 0; i < background.length; i++) {
		background[i].style = `
			background: ${vibrantHex}; 
			box-shadow: 0px 0px 45px ${vibrantHex};
		`;
	}
	document.getElementById('style').innerHTML = `
		::-webkit-scrollbar {
			width: 8px;
			background: rgb( 220, 220, 220);
		}
		::-webkit-scrollbar-thumb {
			background: ${vibrantHex};
			width: 2px !important;
		}
		#app #player #pic,
		#app #player #bar #progress #pbar,
		#app #player #bar #currentTime,
		#app #player #bar #totalTime,
		#app #player #controls button {
			box-shadow: 4px 4px 16px ${vibrantHex};
		}
		#app #player #controls #after {
			box-shadow: -4px -4px 16px ${vibrantHex};
		}
		#app #player #name {
			text-shadow: 1px 1px 4px ${vibrantHex};
		}
		#app #container #space #cont button.list:hover {
			background: ${vibrantHex};
		}
		#app #container #stitle {
			box-shadow: 0px 0px 80px ${vibrantHex};
		}
		#app #container #space #cont button.list.active span,
		#app #container #space #cont button.list.active:hover span {
			text-shadow: 0px 0px 2px ${vibrantHex} !important;
		}
	`;
	// Results into: Vibrant Muted DarkVibrant DarkMuted LightVibrant
});