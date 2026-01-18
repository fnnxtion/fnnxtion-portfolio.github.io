/*=========================================================================*\
 Navigasi  di refresh tetap berada di class active sesuai hastagnya #...
\*=========================================================================*/

document.addEventListener("DOMContentLoaded", () => {
	function navigateToSection() {
		var hash = window.location.hash.substr(1); // Mengambil nilai hash tanpa '#'

		// Menghilangkan class 'active' dari semua bagian
		document.querySelectorAll("[data-page]").forEach((section) => {
			section.classList.remove("active");
		});

		// Jika tidak ada hash, gunakan default 'about' sebagai hash
		if (!hash) {
			hash = "about"; // Default ke 'about' jika tidak ada hash
			window.location.hash = "#" + hash; // Opsional: Tambahkan #about ke URL
		}

		var targetSection = document.querySelector('[data-page="' + hash + '"]');
		if (targetSection) {
			targetSection.classList.add("active");
		}

		// Menyesuaikan navigasi berdasarkan hash
		document.querySelectorAll(".navbar-link").forEach((link) => {
			if (link.getAttribute("href") === "#" + hash) {
				// Menambahkan class 'active' pada link navigasi yang sesuai
				document
					.querySelectorAll(".navbar-link")
					.forEach((link) => link.classList.remove("active"));
				link.classList.add("active");
			}
		});
	}

	// Menangani perubahan hash
	window.addEventListener("hashchange", navigateToSection);

	// Panggil fungsi saat halaman dimuat
	navigateToSection();
});

/*======================*\
  #End Navigasi Active
\*======================*/

// element toggle function
const elementToggleFunc = (elem) => {
	elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", () => {
	elementToggleFunc(sidebar);
});

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// Seleksi elemen sertifikat
document.querySelectorAll(".project-item").forEach((item) => {
	item.addEventListener("click", function () {
		// Mendapatkan data dari item yang diklik
		const imgSrc = this.querySelector("img").src;
		const title = this.querySelector(".project-title").textContent;
		const category = this.querySelector(".project-category").textContent;

		// Menetapkan data ke modal
		document.getElementById("modalImg").src = imgSrc;
		document.getElementById("modalTitle").textContent = title;
		document.getElementById("modalCategory").textContent = category;

		// Menampilkan modal
		document.getElementById("certificateModal").style.display = "block";
	});
});

// Ketika pengguna mengklik tombol close (x), tutup modal
document.querySelector(".close-button").addEventListener("click", () => {
	document.getElementById("certificateModal").style.display = "none";
});

// Juga bisa menambahkan fungsi untuk menutup modal jika pengguna mengklik di luar konten modal
window.onclick = (event) => {
	const modal = document.getElementById("certificateModal");
	if (event.target == modal) {
		modal.style.display = "none";
	}
	const galleryModal = document.getElementById("projectGalleryModal");
	if (event.target == galleryModal) {
		galleryModal.style.display = "none";
	}
};

// ========================== */
// Project Gallery Modal Handler
// ========================== */

// Gallery data structure - maps project titles to their gallery images
const projectGalleries = {
	"g-algae": {
		images: [
			"./assets/images/Projects/o2gen1.jpg",
			"./assets/images/Projects/o2gen2.jpeg",
			"./assets/images/Projects/o2gen4.jpeg",
		],
		description: "This project comes from PT. Inovasi Hijau Indonesia (Greenlabs). The goal of this project was to provide users with insights into how much carbon dioxide is absorbed by the algae and how much oxygen is generated, along with environmental measurements like temperature, humidity, and particulate matter (PM2.5). The system design involves PCB layout using Eagle, Arduino programming, and testing. All data is processed through Arduino Mega and displayed on a 3.5-inch TFT Display. A monitoring website was created using HTML and CSS with JavaScript backend, connected to Firebase API for real-time data collection."
	},
	"apple sorting": {
		images: [
			"./assets/images/Projects/apple1.png",
			"./assets/images/Projects/apple2.jpg",
		],
		description: "Sorting apple using YOLOv5 algorithm. The model create from scratch, using Apple Manalagi for the datasets. The dataset consist of 913 of photo that divided into train and test. Furthermore its combine object detection with object measurement to reach purpose of sorting apple."
	},
	"smoke bomb tracking": {
		images: [
			"./assets/images/Projects/smoke1.jpeg",
			"./assets/images/Projects/smoke2.jpg",
			"./assets/images/Projects/smoke3.jpg",
		],
		description: "I'm in charge to create hardware and IoT System. This system used for smoke bomb tracking along with certain data such as distance from camera to object, degree and distance from calibration point to object. The camera has two axis movement that could controlled automatic or manual. The website itself made using laravel framework."
	},
	"trainer iot": {
		images: [
			"./assets/images/Projects/trainer1.jpeg",
			"./assets/images/Projects/trainer2.jpg",
		],
		description: "In charge to create hardware system for the training. Using PZEM 004T for AC load and INA219 for DC load. Also, sending data from hardware to cloud-server using Firebase Real-time Database. For the dashboard using Visual Basic to create and collect data form Firebase. Then the apps could run in windows-based. In total we made eight trainer."
	},
	"aquaponic monitoring": {
		images: [
			"./assets/images/Projects/hydro1.jpg",
			"./assets/images/Projects/hydro1.jpeg",
		],
		description: "Monitoring for aquaponic with two fish ponds consist of several parameter such as pH value, TDS value, water temperature, environment temperature and humidity."
	},
};

// Seleksi blog posts untuk menampilkan gallery
document.querySelectorAll(".blog-post-item").forEach((item) => {
	item.addEventListener("click", function (e) {
		// Jangan buka link default jika ada gallery
		const link = this.querySelector("a");
		const title = this.querySelector(".blog-item-title").textContent.toLowerCase();
		
		// Check if gallery data exists for this project
		let galleryData = null;
		for (const [key, data] of Object.entries(projectGalleries)) {
			if (title.includes(key)) {
				galleryData = data;
				break;
			}
		}

		// If gallery data exists, show gallery modal and prevent default
		if (galleryData) {
			e.preventDefault();
			
			// Set gallery images
			const galleryImages = document.querySelectorAll(".gallery-img");
			let visibleCount = 0;
			galleryImages.forEach((img, index) => {
				if (galleryData.images[index]) {
					img.src = galleryData.images[index];
					img.style.display = "block";
					visibleCount++;
				} else {
					img.style.display = "none";
				}
			});

			// Adjust grid based on number of images
			const galleryGrid = document.querySelector(".gallery-grid");
			if (visibleCount <= 2) {
				galleryGrid.style.gridTemplateColumns = "1fr";
			} else if (visibleCount === 3) {
				galleryGrid.style.gridTemplateColumns = "repeat(2, 1fr)";
			} else {
				galleryGrid.style.gridTemplateColumns = "repeat(2, 1fr)";
			}

			// Set gallery title and description
			document.getElementById("galleryTitle").textContent = title;
			document.getElementById("galleryDescription").textContent = galleryData.description;

			// Show gallery modal
			document.getElementById("projectGalleryModal").style.display = "block";
		}
	});
});

// Close gallery modal button
const galleryCloseBtn = document.querySelector(".gallery-close-btn");
if (galleryCloseBtn) {
	galleryCloseBtn.addEventListener("click", () => {
		document.getElementById("projectGalleryModal").style.display = "none";
	});
}

// ========================== */
// End Project Gallery Modal
// ========================== */

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
	elementToggleFunc(this);
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
	selectItems[i].addEventListener("click", function () {
		const selectedValue = this.innerText.toLowerCase();
		selectValue.innerText = this.innerText;
		elementToggleFunc(select);
		filterFunc(selectedValue);
	});
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = (selectedValue) => {
	for (let i = 0; i < filterItems.length; i++) {
		if (selectedValue === "all") {
			filterItems[i].classList.add("active");
		} else if (selectedValue === filterItems[i].dataset.category) {
			filterItems[i].classList.add("active");
		} else {
			filterItems[i].classList.remove("active");
		}
	}
};

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
	filterBtn[i].addEventListener("click", function () {
		const selectedValue = this.innerText.toLowerCase();
		selectValue.innerText = this.innerText;
		filterFunc(selectedValue);

		lastClickedBtn.classList.remove("active");
		this.classList.add("active");
		lastClickedBtn = this;
	});
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
	formInputs[i].addEventListener("input", () => {
		// check form validation
		if (form.checkValidity()) {
			formBtn.removeAttribute("disabled");
		} else {
			formBtn.setAttribute("disabled", "");
		}
	});
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
	navigationLinks[i].addEventListener("click", function () {
		for (let i = 0; i < pages.length; i++) {
			if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
				pages[i].classList.add("active");
				navigationLinks[i].classList.add("active");
				window.scrollTo(0, 0);
			} else {
				pages[i].classList.remove("active");
				navigationLinks[i].classList.remove("active");
			}
		}
	});
}

/*==========================*\
    #Halaman Project Saya
\*==========================*/
// Fungsi untuk memuat peta secara lazy loading
function lazyLoadMap() {
	const mapContainer = document.getElementById("map-container");
	const mapIframe = document.createElement("iframe");
	mapIframe.src =
		"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253553.36629769515!2d110.86797854999999!3d-6.79765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70c532064fbb8f%3A0x3027a76e352bb30!2sKabupaten%20Kudus%2C%20Jawa%20Tengah!5e0!3m2!1sid!2sid!4v1707889204981!5m2!1sid!2sid";
	mapIframe.width = "400";
	mapIframe.height = "300";
	mapIframe.loading = "lazy";
	mapContainer.appendChild(mapIframe);
}

// Mendeteksi ketika kontainer peta terlihat di viewport
function isMapVisible() {
	const mapContainer = document.getElementById("map-container");
	const rect = mapContainer.getBoundingClientRect();
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <=
			(window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
}

// Memuat peta ketika kontainer terlihat di viewport
window.addEventListener("scroll", () => {
	if (isMapVisible()) {
		lazyLoadMap();
		window.removeEventListener("scroll", arguments.callee);
	}
});
/*==========================*\
    #End Halaman Project
\*==========================*/
