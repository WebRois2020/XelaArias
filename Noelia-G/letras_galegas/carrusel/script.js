document.getElementById("outer3").addEventListener("click", toggleState3);

function toggleState3() {
	let galleryView = document.getElementById("galleryView")
	let tilesView = document.getElementById("tilesView")
	let outer = document.getElementById("outer3");
	let slider = document.getElementById("slider3");
	let tilesContainer = document.getElementById("tilesContainer");
	if (slider.classList.contains("active")) {
		slider.classList.remove("active");
		outer.classList.remove("outerActive");
		galleryView.style.display = "flex";
		tilesView.style.display = "none";

		while (tilesContainer.hasChildNodes()) {
			tilesContainer.removeChild(tilesContainer.firstChild)
		}
	} else {
		slider.classList.add("active");
		outer.classList.add("outerActive");
		galleryView.style.display = "none";
		tilesView.style.display = "flex";

		for (let i = 0; i <= imgObject.length - 1; i++) {
			let tileItem = document.createElement("div");
			tileItem.classList.add("tileItem");
			tileItem.style.background = "url(" + imgObject[i] + ")";
			tileItem.style.backgroundRepeat = "no-repeat"; // susi: imaxe non repetir no background
			tileItem.style.backgroundSize = "cover"; // susi: cambio o tamaño para que ocupen background todas igual
			tilesContainer.appendChild(tileItem);
		}
	};
}
// susi:hasta aquói as miniaturas

var imgObject = [
  	"imaxes/denuncia_equilibrio.jpg",
	"imaxes/denuncia_equilibrio_2.jpg",
	"imaxes/cabalos.jpg",
   "imaxes/diario.jpg",
	"imaxes/diario_2.jpg",
	"imaxes/intemperiome_2.jpg",
	"imaxes/intemperiome_3.jpg",
	"imaxes/reunida.jpg"

];
// susi: cambio let por var
var mainImg = 0;
var prevImg = imgObject.length - 1;
var nextImg = 1;

// susi: cargamos a galeria
function loadGallery() {

	let mainView = document.getElementById("mainView");
	mainView.style.background = "url(" + imgObject[mainImg] + ")";

	mainView.style.backgroundRepeat = "no-repeat"; // susi: imaxe non repetir no background
	mainView.style.backgroundSize = "cover"; // susi: cambio o tamaño para que ocupen background todas igual


	let leftView = document.getElementById("leftView");
	leftView.style.background = "url(" + imgObject[prevImg] + ")";

	leftView.style.backgroundRepeat = "no-repeat"; // susi: imaxe non repetir no background
	leftView.style.backgroundSize = "cover"; // susi: cambio o tamaño para que ocupen background todas igual


	let rightView = document.getElementById("rightView");
	rightView.style.background = "url(" + imgObject[nextImg] + ")";

	rightView.style.backgroundRepeat = "no-repeat"; // susi: imaxe non repetir no background
	rightView.style.backgroundSize = "cover"; // susi: cambio o tamaño para que ocupen background todas igual


	let linkTag = document.getElementById("linkTag")
	linkTag.href = imgObject[mainImg];

};

function scrollRight() {

	prevImg = mainImg;
	mainImg = nextImg;
	if (nextImg >= (imgObject.length - 1)) {
		nextImg = 0;
	} else {
		nextImg++;
	};
	loadGallery();
};

function scrollLeft() {
	nextImg = mainImg
	mainImg = prevImg;

	if (prevImg === 0) {
		prevImg = imgObject.length - 1;
	} else {
		prevImg--;
	};
	loadGallery();
};

document.getElementById("navRight").addEventListener("click", scrollRight);
document.getElementById("navLeft").addEventListener("click", scrollLeft);
document.getElementById("rightView").addEventListener("click", scrollRight);
document.getElementById("leftView").addEventListener("click", scrollLeft);
document.addEventListener('keyup', function (e) {
	if (e.keyCode === 37) {
		scrollLeft();
	} else if (e.keyCode === 39) {
		scrollRight();
	}
});

loadGallery();
