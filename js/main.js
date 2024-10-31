$(function () {
  // ============다크모드 토글
  $("#dark_mode_toggle").click(function () {
    $("#wrap").toggleClass("dark");
  });
  // =============헤더

  let lastScrollY = window.scrollY; // 마지막 스크롤 위치 저장

  window.addEventListener("scroll", function () {
    const headerBar = document.querySelector(".header_bar"); // .header_bar 선택
    if (window.scrollY > lastScrollY) {
      // 스크롤을 내릴 때
      headerBar.style.transform = "translateY(-100%)"; // 헤더 숨기기
    } else {
      // 스크롤을 올릴 때
      headerBar.style.transform = "translateY(0)"; // 헤더 보이기
    }
    lastScrollY = window.scrollY; // 현재 스크롤 위치 업데이트
  });

  //=================프로젝트 버튼
  function initializeToggle() {
    const toggleButton = document.getElementById("toggleButton");
    const publishingWrap = document.querySelector(".publishing_wrap");
    if (toggleButton && publishingWrap) {
      toggleButton.addEventListener("click", function () {
        if (publishingWrap.classList.contains("expanded")) {
          publishingWrap.classList.remove("expanded");
          toggleButton.textContent = "펼치기";
        } else {
          publishingWrap.classList.add("expanded");
          toggleButton.textContent = "접기";
        }
      });
    } else {
    }
  }
  initializeToggle();
  // ================스와이퍼
  const design_swiper = new Swiper(".design_swiper", {
    speed: 1000,
    slidesPerView: 2,
    fadeEffect: {
      crossFade: true,
    },

    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  });
  // ================캐러셀 이미지 이동
  function applyHoverEffect() {
    $(".case a")
      .off("mouseenter mouseleave")
      .on("mouseenter", function () {
        let imgH = $(this).find("img").height();
        let caseH = $(this).height();
        $(this)
          .find("img")
          .css({
            top: -(imgH - caseH),
          });
      })
      .on("mouseleave", function () {
        $(this).find("img").css({
          top: 0,
        });
      });
  }
  // =============프레임워크
  $(".framework_btn li").click(function () {
    if ($(this).text().trim() === "React") {
      $(".react_box").show();
      $(".vue_box").hide();
      $(this).find(".blur_box").addClass("active");
      $(this).siblings().find(".blur_box").removeClass("active");
    } else if ($(this).text().trim() === "Vue") {
      $(".react_box").hide();
      $(".vue_box").show();
      $(this).find(".blur_box").addClass("active");
      $(this).siblings().find(".blur_box").removeClass("active");
    }
  });
  // ================GSAP
  gsap.registerPlugin(ScrollTrigger);

  const roll = document.querySelector(".roll");
  const contentBox2 = document.querySelector(".content_wrap");

  // ScrollTrigger를 사용하여 스크롤에 따라 회전
  const scrollTrigger = ScrollTrigger.create({
    trigger: contentBox2,
    start: "top center", // .content_box2의 상단이 뷰포트 상단에 닿을 때
    end: "bottom top", // .content_box2의 하단이 뷰포트 상단에 닿을 때
    onUpdate: function (self) {
      const rotation = self.progress * 360; // 스크롤 진행 비율에 따라 회전
      gsap.to(roll, {
        rotation: rotation,
        duration: 0.1, // 회전 애니메이션의 지속 시간
        ease: "none", // 부드러운 회전
      });
    },
    scrub: true, // 스크롤에 따라 애니메이션을 부드럽게
  });

  // ==========숫자
  const t3 = gsap.timeline({
    scrollTrigger: {
      trigger: ".content_box2",
      start: "bottom bottom",
      end: "top top",
      scrub: true,
    },
  });

  $("#scroll_number li").css("transform", "translateY(0)");

  t3.to("#scroll_number li", {
    transform: "translateY(-105%)",
    duration: 1,
  });

  applyHoverEffect();
});
