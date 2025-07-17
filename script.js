const questions = [
    {
        category: "Connecting with the family of God",
        questions: [
            {
                text: "I am intentionally cultivating relationships with Christian friends and spiritual mentors",
                detail: "I identify Christians who have character qualities I admire, and spend time with them"
            },
            {
                text: "I am cultivating authentic community by speaking the truth in love and creating healthy boundaries",
                detail: "I don't just opt for the quiet life - I say what needs to be said, but in a loving, up building way"
            },
            {
                text: "I am increasingly becoming loving, grace-giving and forgiving to others",
                detail: "When people annoy me, I am increasingly able to respond calmly and positively"
            },
            {
                text: "I am authentically connecting in my immediate family relationships (spouse, children, siblings)",
                detail: "Though we can't get on with everyone, so far as it is down to me I am seeking to build honest, positive relationships"
            },
            {
                text: "I am resolving conflict with others in a Biblical manner and supporting the leadership of this church family",
                detail: "Whether in my personal family, or in the family of the church, I am increasingly refusing to cause division through gossip, mud-slinging or character assassination"
            }
        ]
    },
    {
        category: "Maturing in my spiritual life",
        questions: [
            {
                text: "I am growing spiritually through regular quiet times, reading God's word and praying",
                detail: ""
            },
            {
                text: "I avoid addictive behaviours that hinder my growth",
                detail: "Food, busyness, tv etc. Though these things, in themselves are not wrong, am I using them as a means of avoiding sorting out real issues in my life?"
            },
            {
                text: "I have an active relationship with one or several people that encourage me in my spiritual walk",
                detail: "People to whom I make myself open and accountable"
            },
            {
                text: "I am experiencing an increase of the Fruit of the Spirit in my life (love, joy, peace, patience, kindness, goodness, gentleness and self control - Galatians 5:22-23)",
                detail: ""
            },
            {
                text: "I am honouring God with my finances and, therefore, tithing to the church (giving 10%)",
                detail: ""
            }
        ]
    },
    {
        category: "Discovering my ministry in the church",
        questions: [
            {
                text: "I have discovered how God has made me (Discovery) and am actively seeking to develop that in ministry",
                detail: ""
            },
            {
                text: "I am actively demonstrating that I am Christ's servant in ordinary ways",
                detail: "In my attitudes towards family, friends, church, work etc"
            },
            {
                text: "I am serving in a regular ministry in the church body",
                detail: ""
            },
            {
                text: "I am taking the opportunities presented in the church regarding courses and gatherings for support of my ministry",
                detail: ""
            },
            {
                text: "I am an active, participating member of my Connect group",
                detail: ""
            }
        ]
    },
    {
        category: "Growing in my sense of mission in the world",
        questions: [
            {
                text: "I am actively praying for and cultivating relationships with unchurched friends and family",
                detail: ""
            },
            {
                text: "I am actively witnessing to spiritual seekers",
                detail: "Through telling my story, or through inviting them to church, or to other Christian events or introducing them to other Christians, or some other means"
            },
            {
                text: "I am praying for God to show me where he can use me in the world in which I live",
                detail: ""
            },
            {
                text: "I am actively looking for and taking opportunities to build positively into other peoples' lives",
                detail: "I am looking for ways of demonstrating Christ's love through words and acts of kindness to those who don't yet know him"
            },
            {
                text: "I am known by others as one who lives out their beliefs in their everyday life",
                detail: ""
            }
        ]
    },
    {
        category: "Deepening my relationship with God in worship",
        questions: [
            {
                text: "I am faithfully attending corporate worship services at my church with an attitude of positive expectation that God will meet with me",
                detail: ""
            },
            {
                text: "I am actively seeking to know and do what pleases God as a way of life",
                detail: ""
            },
            {
                text: "I am surrendering my whole life to the Lord, including the area of exercise and nutrition (Romans 12: 1)",
                detail: "The way I treat my body, soul and spirit reflects my belief that they were created by, and belong to God"
            },
            {
                text: "The worship songs that I sing accurately and increasingly reflect my true feelings about God",
                detail: ""
            },
            {
                text: "I am honouring God with every dimension of my life by balancing His purposes in my life",
                detail: "Am increasingly demonstrating that I see the importance of all five of these areas being in proper balance"
            }
        ]
    }
];

let currentQuestionIndex = 0;
let answers = [];
let totalQuestions = 0;

// Calculate total questions
questions.forEach(category => {
    totalQuestions += category.questions.length;
});

function getCurrentQuestion() {
    let questionCount = 0;
    for (let categoryIndex = 0; categoryIndex < questions.length; categoryIndex++) {
        const category = questions[categoryIndex];
        if (questionCount + category.questions.length > currentQuestionIndex) {
            const questionInCategory = currentQuestionIndex - questionCount;
            return {
                category: category.category,
                question: category.questions[questionInCategory],
                categoryIndex: categoryIndex,
                questionIndex: questionInCategory
            };
        }
        questionCount += category.questions.length;
    }
}

function displayQuestion() {
    const current = getCurrentQuestion();

    document.body.className = `category-${current.categoryIndex}`;

    document.getElementById('questionNumber').textContent = `Question ${currentQuestionIndex + 1} of ${totalQuestions}`;
    document.getElementById('categoryName').textContent = current.category;
    document.getElementById('questionText').textContent = current.question.text;
    document.getElementById('questionDetail').textContent = current.question.detail;

    // Update progress bar
    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
    document.getElementById('progressFill').style.width = progress + '%';

    // Set slider value
    const slider = document.getElementById('ratingSlider');
    const thumb = document.getElementById('sliderThumb');
    slider.value = answers[currentQuestionIndex] !== undefined ? answers[currentQuestionIndex] : 0;
    thumb.textContent = slider.value;

    // Position thumb
    updateSliderThumb();

    // Update button states
    document.getElementById('prevBtn').disabled = currentQuestionIndex === 0;
    document.getElementById('nextBtn').disabled = answers[currentQuestionIndex] === undefined;

    if (currentQuestionIndex === totalQuestions - 1) {
        document.getElementById('nextBtn').textContent = 'View Results';
    } else {
        document.getElementById('nextBtn').textContent = 'Next';
    }
}

function selectRating(value) {
    answers[currentQuestionIndex] = value;

    // Update UI
    document.getElementById('ratingSlider').value = value;
    document.getElementById('sliderThumb').textContent = value;
    updateSliderThumb();

    // Enable next button
    document.getElementById('nextBtn').disabled = false;
}

function updateSliderThumb() {
    const slider = document.getElementById('ratingSlider');
    const thumb = document.getElementById('sliderThumb');
    const min = parseInt(slider.min);
    const max = parseInt(slider.max);
    const val = parseInt(slider.value);

    // Calculate position
    const percent = (val - min) / (max - min);
    const sliderWidth = slider.offsetWidth;
    const thumbWidth = thumb.offsetWidth;
    // Position so the center of .slider-thumb matches the center of the native thumb
    const left = percent * (sliderWidth - thumbWidth) + thumbWidth / 2;

    thumb.style.left = `${left}px`;
    thumb.style.top = '50%';
    thumb.style.transform = 'translate(-50%, -50%)';
}

function nextQuestion() {
    if (currentQuestionIndex < totalQuestions - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        showResults();
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

function getScoreLevel(score) {
    if (score <= 5) return { level: 'Poor', class: 'poor' };
    if (score <= 10) return { level: 'Fair', class: 'fair' };
    if (score <= 15) return { level: 'Good', class: 'good' };
    if (score <= 20) return { level: 'Very Good', class: 'very-good' };
    return { level: 'Outstanding', class: 'outstanding' };
}

function showResults() {
    document.getElementById('questionSection').style.display = 'none';
    document.getElementById('results').classList.add('show');
    document.body.className = '';

    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';

    let answerIndex = 0;

    // Go deeper content for each category
    const goDeeperContent = [
        `<p>
            <strong>Connecting with the family of God:</strong> The book of Romans is a great starting point for advice on how to connect with the family of God. If you have 5 minutes spare read Romans 12 as it speaks so clearly into these topics!<br><br>
            If you want to go even further into studying it we have a great Bible study series available called <em>Romans: The Real Truth of Christianity</em>; ask your connect group leader if you would like a copy.
        </p>`,
        `<p>
            <strong>Maturing in my spiritual life:</strong> You can read the bible anywhere with the YouVersion Bible app. It has reading plans and it can even read it to you! Goto <a href="https://bible.com" target="_blank">bible.com</a> for more information.<br><br>
            <a href="https://thebibleproject.com" target="_blank">Thebibleproject.com</a> is a great resource for developing a deeper understanding of the bible and how it all fits together. The videos are simple and quick so it’s a great starting point.<br><br>
            We believe in the principle of tithing which is how church gets most of it’s funding. If you don’t know much about tithing then ask one of the leaders at church or watch a talk by James Burn called “Giving as an act of Faith” on YouTube (<a href="https://tiny.cc/kfgiving" target="_blank">tiny.cc/kfgiving</a>).<br>
            If you decide that you would like to tithe then we have a giving form with all the information you need at the back of this booklet.
        </p>`,
        `<p>
            <strong>Discovering my ministry in the church:</strong> Do you want to get involved but have no idea where you would be most effective at serving?<br>
            We have a tool called “Discovery” at Kingfisher Church which is like a questionnaire which helps you figure out how God has wired you up as a person and what areas of ministry you may suit serving in. Ollie or James will look through the finished questionnaire and advise on what ministries will be a great fit for you to get involved in!<br>
            Ask your connect group leader or any leader at church for more information or to get a copy of Discovery.
        </p>`,
        `<p>
            <strong>Growing in my sense of mission in the world:</strong> Commit to one specific person in your life that you could be praying that they will start a journey to faith in God. Think of that person as your “Plus One” to invite along to church.<br><br>
            As well as finding where you can serve in Church, there are plenty of opportunities to serve in different ways in the social enterprise that grew out of our church.
        </p>`,
        `<p>
            <strong>Deepening my relationship with God in worship:</strong> Try listening to more worship music throughout the week. Journeys in the car can become opportunities for times of worship and prayer so that time is useful!<br><br>
            Find us on Spotify for Kingfisher Church songs as well as playlists of worship music that we will either be singing at church or that we think will be encouraging to listen to.
        </p>`
    ];

    questions.forEach((category, categoryIndex) => {
        let categoryScore = 0;
        for (let i = 0; i < category.questions.length; i++) {
            categoryScore += answers[answerIndex + i];
        }
        const scoreInfo = getScoreLevel(categoryScore);

        // Accordion HTML
        const accordionDiv = document.createElement('div');
        accordionDiv.className = `accordion category-${categoryIndex}`;

        accordionDiv.innerHTML = `
            <div class="accordion-header">
                <div class="accordion-summary">
                    <div>
                        <h3>${category.category}</h3>
                        <a href="#" class="go-deeper-link" data-acc-index="${categoryIndex}" style="font-style:italic; font-size:0.95rem; display:block; margin-top:6px;">Go deeper</a>
                    </div>
                    <div class="accordion-score-block">
                        <div class="result-score">${categoryScore} / 25</div>
                        <div class="result-level ${scoreInfo.class}">${scoreInfo.level}</div>
                    </div>
                </div>
            </div>
            <div class="accordion-content">
                ${goDeeperContent[categoryIndex]}
            </div>
        `;
        resultsContainer.appendChild(accordionDiv);

        answerIndex += category.questions.length;
    });

    // Add accordion open/close logic
    document.querySelectorAll('.go-deeper-link').forEach(link => {
        link.onclick = function(e) {
            e.preventDefault();
            const acc = link.closest('.accordion');
            acc.classList.toggle('open');
        };
    });
}

function restartAssessment() {
    currentQuestionIndex = 0;
    answers = [];
    document.getElementById('results').classList.remove('show');
    document.getElementById('questionSection').style.display = 'block';
    displayQuestion();
}

// Event listeners
document.getElementById('ratingSlider').addEventListener('input', function() {
    const value = this.value;
    document.getElementById('sliderThumb').textContent = value;
    selectRating(parseInt(value));
});

// Initialize
displayQuestion();