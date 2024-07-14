$(document).ready(function () {
    $('#image-container').ripples({
        resolution: 256,
        dropRadius: 20,
        perturbance: 0.01,
    });

    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    var ballHeight = $('.ball').height();
    var middleTopPosition = (windowHeight / 2) - (ballHeight / 2);
    var middleLeftPosition = (windowWidth / 2) - (ballHeight / 2);
    var settledBalls = 0;

    function formCircle() {
        const radius = 100;
        const angleIncrement = (2 * Math.PI) / 4;
        const centerX = windowWidth / 2;
        const centerY = middleTopPosition + ballHeight / 2;

        $('.ball').each(function (index) {
            const angle = index * angleIncrement;
            const x = centerX + radius * Math.cos(angle) - (ballHeight / 2);
            const y = centerY + radius * Math.sin(angle) - (ballHeight / 2);
            $(this).stop(true, true).animate({ top: y, left: x }, 1000);
        });
    }

    $('#centerBall').css({ top: -70, left: middleLeftPosition }).animate({
        top: middleTopPosition
    }, 1000, function () {
        $('#image-container').ripples('drop', $(this).offset().left + (ballHeight / 2), middleTopPosition + ballHeight / 2, 50, 0.05);
    });

    $('.ball').css({ top: -70, left: middleLeftPosition }).animate({
        top: middleTopPosition
    }, 1000, function () {
        settledBalls++;
        $('#image-container').ripples('drop', $(this).offset().left + (ballHeight / 2), middleTopPosition + ballHeight / 2, 50, 0.05);
        if (settledBalls === 4) {
            formCircle();
        }
    });

    $('.ball').on('click', function () {
        var selectedBall = $(this);
        var selectedContent = $(selectedBall.data('content'));

        $('.ball').each(function (index) {
            var ball = $(this);
            var newLeft = (index + 1) * (windowWidth / 5) - (ball.width() / 2);
            ball.stop(true, true).animate({ top: '10px', left: newLeft }, 1000);
        });

        $('.new-card').stop(true, true).fadeOut(function () {
            selectedContent.css({ top: '40%', left: '50%' }).fadeIn();
        });
    });

    $('.close-button').on('click', function () {
        var newCard = $(this).closest('.new-card');
        newCard.stop(true, true).fadeOut(function () {
            formCircle();
        });
    });
});
