/*
 * BOKENS INNEHÅLL
 * ---------------
 * Ändra namnet här så uppdateras det överallt i boken.
 * Varje post i listan är en sida (vanlig HTML).
 *  - Första sidan blir framsidan, sista sidan blir baksidan.
 *  - Sidor med class "cover" eller "endpaper" får pärm-/försättsbladsstil.
 *  - folio: false = inget sidnummer på den sidan.
 *  - flow: true = lång text delas automatiskt upp på så många sidor som behövs.
 *  - title: "..." = texten tas med i innehållsförteckningen.
 *  - Udda antal sidor? Då läggs en tom sida in automatiskt före baksidan.
 * Bilder: lägg filen i mappen och skriv t.ex. <img src="bild.jpg" style="width:100%">
 */
const HER_NAME = "Babu";

const HEART = `<svg class="heart" viewBox="0 0 40 36" aria-hidden="true"><path d="M20 33 C9 25 3 19 3 11.5 C3 6.5 7 3 11.5 3 C15 3 18 5 20 8.5 C22 5 25 3 28.5 3 C33 3 37 6.5 37 11.5 C37 19 31 25 20 33 Z"/></svg>`;

const BOOK = {
  pages: [
    // 0 – Front cover
    { class: "cover", html: `
      <div class="center">
        <h1>Words about u</h1>
        <p class="small">Volume 1</p>
      </div>` },

    // 1 – Inside front cover
    { class: "endpaper", html: `` },

    // 2 – Första sidan
    { html: `
      <div class="center" style="justify-content:flex-start; padding-top:24cqw">
        <h1 style="font-size:1.9em; font-style:italic; font-weight:400">Happy Birthday Babu</h1>
        <p style="max-width:88%; margin-top:2.6em; font-size:.9em; line-height:1.5; opacity:.85">These are texts that I have had in my notes on my phone. Some of them u have seen, some of them u haven't</p>
        <div class="mini-flags"><svg viewBox="0 0 200 100" aria-label="Philippines"><rect width="200" height="50" fill="#0038A8"/><rect y="50" width="200" height="50" fill="#CE1126"/><polygon points="0,0 86.6,50 0,100" fill="#fff"/><g fill="#FCD116"><circle cx="29" cy="50" r="7.5"/><polygon points="37.8,48.0 46.0,50.0 37.8,52.0"/><polygon points="36.6,54.8 41.0,62.0 33.8,57.6"/><polygon points="31.0,58.8 29.0,67.0 27.0,58.8"/><polygon points="24.2,57.6 17.0,62.0 21.4,54.8"/><polygon points="20.2,52.0 12.0,50.0 20.2,48.0"/><polygon points="21.4,45.2 17.0,38.0 24.2,42.4"/><polygon points="27.0,41.2 29.0,33.0 31.0,41.2"/><polygon points="33.8,42.4 41.0,38.0 36.6,45.2"/><polygon points="8.0,4.5 9.0,7.6 12.3,7.6 9.6,9.5 10.6,12.6 8.0,10.7 5.4,12.6 6.4,9.5 3.7,7.6 7.0,7.6"/><polygon points="8.0,86.5 9.0,89.6 12.3,89.6 9.6,91.5 10.6,94.6 8.0,92.7 5.4,94.6 6.4,91.5 3.7,89.6 7.0,89.6"/><polygon points="75.0,45.5 76.0,48.6 79.3,48.6 76.6,50.5 77.6,53.6 75.0,51.7 72.4,53.6 73.4,50.5 70.7,48.6 74.0,48.6"/></g></svg><svg viewBox="0 0 160 100" aria-label="Sweden"><rect width="160" height="100" fill="#006AA7"/><rect x="50" width="20" height="100" fill="#FECC02"/><rect y="40" width="160" height="20" fill="#FECC02"/></svg></div>
      </div>` },

    // Innehållsförteckning – fylls i automatiskt med alla sidor som har "title"
    { toc: true, folio: false, html: `` },

    // The first one (två sidor)
    { title: "The first one", html: `
      <div class="poem">
        <h2>The first one</h2>
        <p>I feel empty. I feel wrong. I feel like I am a tragic love song.</p>
        <p>A song about longing, a song about despair. A song about distance that isn’t fair.</p>
        <p>I feel like I’m drowning, but my skin is not wet. How can I miss someone that I’ve never met?</p>
        <p>What are these feelings that I keep inside? What are these emotions that I’m trying to hide?</p>
        <p>If I let them out, my world will crumble. If I let them show, I will start to stumble.</p>
        <p>Are you the one I am meant to find? Or are you just a fantasy in my mind?</p>
      </div>` },
    { html: `
      <div class="poem poem-cont">
        <p>A distant star I chase in vain, a fantasy tangled up in pain.</p>
        <p>So here I am, wishing you were here. But I’m reaching for someone that is nowhere near.</p>
        <p>Unsure if this is wrong or right, yet I think about you every night.</p>
        <p>Now here I stand, thinking about your name.</p>
        <p>For me this isn’t some silly game.</p>
        <p>Should I chase this, I don’t know..</p>
        <p>But fuck, I’m scared to let you go.</p>
      </div>` },

    // Before your exam
    { title: "Before your exam", html: `
      <div class="letter">
        <h2>Before your exam</h2>
        <p>Hi babu</p>
        <p>I’m going to bed now but I just wanted to remind u of how incredible and capable u are. I will be thinking about you and I’m cheering for u loudly from across the world! I know you’re nervous, but that just shows how much u care. U have put in the work, u have prepared and I’m really proud of u. Try to breathe and take it one question at a time. Do your best babe, your best is freaking amazing!</p>
        <p>Good luck babu, you got this!</p>
      </div>` },

    // The long one (flow: true = flödar automatiskt över flera sidor)
    { title: "The long one", flow: true, html: `
      <div class="letter">
        <h2>The long one <span class="subtitle inline">(still applies)</span></h2>
        <p class="date">March 14, 2026</p>
        <p>Hi babu</p>
        <p>I’ve been trying to explain some things that I have on my mind over the phone for our last couple of calls. But for some reason, it seems like I lose my words sometimes when we talk, probably because I love you so damn much.</p>
        <p class="tight">I will try to write it down instead.</p>
        <p>Lately, we have really started to talk about the harder things about us. One thing I’m sure we can agree on is that the way we feel about each other is not the issue. I am madly in love with you, and I know that you love me too.</p>
        <p>I know that you have a lot of doubts and worries, and that’s completely okay babe. I also know that I have said some crazy things about what I am willing to do for us to make this work, and I want you to know that I mean all of it. But I also wanna be careful not to put pressure on you.</p>
        <p class="tight">I know you also have a lot on your mind about what’s next for you, and I support you figuring it out at your own pace.</p>
        <p>As you already know, what scares me the most is if we don’t even give this a real chance, if we give up before we even really tried out of fear that it won’t work. What matters to me is that we give this a real chance, at a pace that feels right for both of us.</p>
        <p>When I talk about being willing to move, I want you to understand that it’s not something I see as a sacrifice. The idea of living somewhere outside of Sweden is something I have felt drawn to for a long time. I’ve always been curious about experiencing life in another country or continent and that feeling has been with me for years. So whether we end up together or not, I know I will still want to explore life somewhere else. It’s something I’ve always wanted for myself. And if we choose to be together, I want you to feel safe knowing that any decision I make to be closer to you comes from what I genuinely want and not from pressure, expectation, or sacrifice.</p>
        <p>I also realize that I might have been a little pushy about coming to visit you, and I’m sorry about that. I don’t want you to ever feel pressured. I really do want to visit Southeast Asia this spring or summer, and of course I would love to come to the Philippines and finally see where you live. But I also understand if you’re not ready for that yet. If that’s the case, I can always visit somewhere else in the region first. What matters to me is that we both feel comfortable with it. But I am really excited to experience life outside of Sweden for a bit.</p>
        <p>Baby, you have awoken feelings in me that I didn’t know I could feel.</p>
        <p class="tight">It’s a little funny that you showed me that Bruno Mars song, because those lyrics might as well have been written by me to you.</p>
        <p>I know that you also feel pressured that I am 33. But trust me when I say that I am not stressed about it whatsoever.</p>
        <p class="tight">I don’t let what society considers “normal” to dictate how I live my life.</p>
        <p class="tight">If that means waiting longer for kids, that’s perfectly fine with me. I’m not saying that just because I know that you are worried about it. I have genuinely always felt like this.</p>
        <p class="tight">Everybody is so fixated on age. For me it’s not about age, but more of what my heart and soul tells me is right.</p>
        <p class="tight">I mean, how can I teach my future kids to follow their hearts if I never did that myself?</p>
        <p>This is not me trying to convince you of anything, I just really wanted to let you know what I think and how I feel about these things.</p>
        <p>So what I’m really saying is that I am in no hurry at all, I’m really not.</p>
        <p class="tight">I know that all you really want for me is to be happy. That’s all I want for you too.</p>
        <p class="tight">What I want is to follow my heart, and my heart is telling me that this is something worth exploring and giving a real chance.</p>
        <p>I also want to tell you this babu, and this is important.</p>
        <p class="tight">Please never feel like you’re responsible for my happiness or the decisions I make. Whatever I choose to do, whether it’s visiting, moving, or experiencing life, it’s my choice. It comes from me, not from you. I will never blame you for my own choices and I won’t regret what we have. My feelings for you are my own, and they’re real. I want us to feel safe, natural, and comfortable together.</p>
        <p class="tight">I just want us to take everything one step at a time, together, gently and without pressure.</p>
        <div class="keep-with-prev">
          <p class="signoff">I love you</p>
          <p class="signature">/ Baba</p>
        </div>
      </div>` },

    // Tomorrow
    { title: "Tomorrow", flow: true, html: `
      <div class="letter">
        <h2>Tomorrow</h2>
        <p>Hey babu</p>
        <p>Tomorrow I’m leaving for the Philippines.</p>
        <p class="tight">That’s actually a crazy thought.</p>
        <p>We called today for like 2 hours. It felt really good to talk to you before leaving today. I have felt really good about going, and I still do. But I’m ngl, right now I’m actually hella nervous. It’s 11:06pm rn and I just want the time to like speed up so that I can just arrive faster.</p>
        <p>I know I’ve said that I’m not going to the ph only for you. That’s partly true. I’m going to the ph for a change of scenery and all that but of course I am also going for you. Of course I am.</p>
        <p class="tight">I know that you’ve said a bunch of times that you can’t promise me that we will meet. And I know that I’ve said that I’m okay with that, which is still true. I will still love you and I will still fight for you even if we don’t see each other. But I just want you to know that the biggest reason for why I am going to the ph, and even your city, is because I really wanna prove to you that everything I’ve been saying about how I feel and that I really wanna fight for you are more than just words. It’s really how I feel. I felt like I needed to do something to really prove that. And I also know that you would never ask me to come see you even if you wanted to.</p>
        <p>Regardless if we see each other or not, I am gonna have a great time.</p>
        <p class="tight">But my biggest dream right now is to actually see you in real life.</p>
        <div class="keep-with-prev">
          <p class="signoff">I love you more than you know babu.</p>
        </div>
      </div>` },

    // Reasons for why I love u
    { title: "Reasons for why I love u", flow: true, html: `
      <div class="letter list">
        <h2>Reasons for why I love u <span class="subtitle">(some of them, there are much more)</span></h2>
        <p class="intro">During one of our calls when I was in the PH I promised u that I was gonna make u a list of why I love u. Mainly cus u asked me if it was only cus of ur tits, I started that list the very same night and here are some of it.</p>
        <p class="reason">The way u smile every time we start a video call</p>
        <p class="reason">The sound of ur laugh</p>
        <p class="reason">Your heart</p>
        <p class="reason">The fact that u care so much about the people in your life</p>
        <p class="reason">Your tits (obviously)</p>
        <p class="reason">Your pretty face</p>
        <p class="reason">Your beautiful eyes</p>
        <p class="reason">Your cute smile</p>
        <p class="reason">Your sexy lips</p>
        <p class="reason">Your voice</p>
        <p class="reason">Your ability to see the best in people before they even see it themselves</p>
        <p class="reason">Your jealousy (it’s hot)</p>
        <p class="reason">The way u get extra clingy when u are sick or tired</p>
        <p class="reason">The way you sometimes fall asleep on call</p>
        <p class="reason">Your snoring</p>
        <p class="reason">How strong u are even if u don’t always know it</p>
        <p class="reason">Everything, literately every single thing</p>
      </div>` },

    // 2 weeks
    { title: "2 weeks", flow: true, html: `
      <div class="letter">
        <h2>2 weeks</h2>
        <p>I’ve been “home” for 2 weeks now. I don’t wanna call it home tho. It doesn’t feel like home and it hasn’t for a long time. But now after spending almost 4 weeks in the ph, it feels even less like home.</p>
        <p>My time in the Philippines was very special. I discovered some things about myself but most of all, I got it confirmed that I actually really am deeply in love with u. Not that I was doubting it before I went but now it’s very, very obvious.</p>
        <p class="tight">I loved the way I felt more connected to u when I was there. I love that during those weeks, we probably talked and texted more than ever before. I really felt like we got closer.</p>
        <p class="tight">And now I’m scared that we are gonna lose that.</p>
        <p class="tight">Maybe I’m imagining things but it kinda already feels like we are losing it a little bit.</p>
        <p class="tight">I know I’m probably overthinking that and that’s okay.</p>
        <p class="tight">I have uncertainties about what the next step for me should be. But if there’s something I’m 100000% sure of, it’s how I feel about u and that I will definitely not give up on u or us.</p>
      </div>` },

    // Text 7 – Oct 3th 2026 (ingen titel än)
    { title: "Oct 3th 2026", flow: true, html: `
      <div class="letter">
        <p class="date">Oct 3th 2026</p>
        <p>Bab,</p>
        <p class="tight">I heard this quote a long time ago, I can’t remember where tho but it popped into my head a couple of days ago.</p>
        <p class="tight">It goes:</p>
        <p class="tight">Sometimes the wait is longer because the blessing is bigger.</p>
        <p class="tight">That really feels true.</p>
        <p class="tight">I just want u to know that I am still here babu.</p>
        <p class="tight">It has been over 8 weeks since we last called but my feelings for u are still the same. I’m still in no rush when it comes to u and I’m not upset with u. I mean yes, I miss u bad haha but it’s okay.</p>
        <p class="tight">I have worked and learned a lot about my self this year and something’s are very clear to me now.</p>
        <p class="tight">One thing that’s clear is that life is not a sprint, it’s a marathon.</p>
        <p class="tight">Having realized that makes that quote hit a little harder cus yea it’s really true, sometimes the wait is longer cus the blessing is bigger.</p>
        <p class="tight">And u are my blessing babu. Regardless of what lies infront of us, u are and have been a blessing to me.</p>
        <p class="tight">I’m so incredibly thankful for u, please never forget that</p>
      </div>` },

    // 8 – Closing note
    { html: `
      <h2>Before you close the book</h2>
      <p>[A short personal note, if you want one.]</p>` },

    // 9 – End
    { folio: false, html: `
      <div class="center">
        <div style="font-size:1.6em">❦</div>
        <p><em>Happy birthday, ${HER_NAME}.</em></p>
      </div>` },

    // 10 – Inside back cover
    { class: "endpaper", html: `` },

    // 11 – Back cover
    { class: "cover", html: `
      <div class="center">
        ${HEART}
      </div>` },
  ],
};
