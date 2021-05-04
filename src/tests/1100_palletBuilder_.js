Feature("Manifest reprinting activities");

Before(({ loginAs }) => {
  loginAs("bob");
});

Scenario(
  "Validate main Pallet Builder page",
  async ({ navFragment, palletBuilderPage, stationIdentityPage }) => {
    await navFragment.gotoStationIdentity();
    await stationIdentityPage.setStationIDHFast();
    await navFragment.gotoPalletBuilder();
    await palletBuilderPage.validatePalletNotLoaded();
  }
);

Scenario(
  "Load and unload an empty pallet for page validation",
  async ({ I, navFragment, palletBuilderPage, stationIdentityPage }) => {
    await navFragment.gotoStationIdentity();
    await stationIdentityPage.setStationIDHFast();
    await navFragment.gotoPalletBuilder();
    I.wait(1);
    await palletBuilderPage.loadPallet("12398755", "1");
    await palletBuilderPage.validatePalletIsLoaded();
    await palletBuilderPage.unloadPallet("Fast");
    await palletBuilderPage.validatePalletPrinted();
  }
);

Scenario.only("Load a pallet and print a manifest", async ({ I, navFragment, stationIdentityPage, basePage, palletBuilderPage }) => {
  await navFragment.gotoStationIdentity();
  await stationIdentityPage.setStationIDHFast();
  await navFragment.gotoPalletBuilder();
  I.wait(1);
  await palletBuilderPage.loadPallet("12398755", "1");
  I.wait(2);
  await basePage.generatePressjobs(3);
  I.wait(20);
  I.click('div[title]');
  I.waitForText('3', 10, 'p');
  await palletBuilderPage.unloadPallet("Fast");
  I.waitForText('Pallet Not Loaded', 30, 'h1');
});
