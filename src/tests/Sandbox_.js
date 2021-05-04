Feature("Sandbox for testing stuff");

Scenario("test something", async ({ I, basePage }) => {
  //loginAs("admin");
  I.amOnPage("/login");
  I.fillField("#username", "bob@infdig.com");
  I.fillField("#password", secret("Runs4ever!"));
  I.click("Sign in");

  await basePage.generatePressjobs(5);

});
