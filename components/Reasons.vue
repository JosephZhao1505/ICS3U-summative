<template>
    <div class="ReasonsToJoin">
    <div class="Reasons">
      <h2>Unbeatable prices</h2>
      <p>Starting at just $6.99 a year you can have access to millions of movies, TV shows and more! That's 1.9 cents a
        day!</p>
    </div>
    <div class="Reasons">
      <h2>Downloading content is extremely storage friendly</h2>
      <p>Due to our low streaming qualities, an entire 3 hour movie is only 500 MB</p>
    </div>
    <div class="Reasons">
      <h2>Watch everywhere</h2>
      <p>From the couch, to the kitchen, your bedroom, the washroom if you want, anywhere in your house and only your
        house.</p>
    </div>
    <div class="Reasons">
      <h2>Reasonable qualities for the price</h2>
      <p>We here at BrokeFLix believe that you should get exactly what you pay for.That's why you get a top quality of
        50p! Thats almost as many pixels as you have braincells (Apologies).</p>
    </div>
  </div>
</template>

<style scoped>
.ReasonsToJoin {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.Reasons {
  background: linear-gradient(lightgray,gray);
  border-radius: 10px;
  width: 220px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.Reasons h2 {
  font-size: 1.2em;
  margin-bottom: 10px;
}

.Reasons p {
  font-size: 0.9em;
  line-height: 1.4;
}
</style>