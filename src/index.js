const core = require('@actions/core');
const axios = require('axios');

(async () => {
  try {
    const webhookUrl = core.getInput('webhook_url');
    const title = core.getInput('title');
    const summary = core.getInput('summary');
    const themeColor = core.getInput('theme_color');
    const text = core.getInput('text');
    const dryRun = core.getInput('dry_run') === 'true';

    let facts = [];
    let actions = [];

    try {
      const factsRaw = core.getInput('facts');
      if (factsRaw) facts = JSON.parse(factsRaw);
    } catch (err) {
      core.warning('Invalid JSON in "facts" input. Ignoring.');
    }

    try {
      const actionsRaw = core.getInput('actions');
      if (actionsRaw) actions = JSON.parse(actionsRaw);
    } catch (err) {
      core.warning('Invalid JSON in "actions" input. Ignoring.');
    }

    const messageCard = {
      "@type": "MessageCard",
      "@context": "http://schema.org/extensions",
      summary,
      themeColor,
      title,
      text,
      sections: facts.length > 0 ? [{
        facts,
        markdown: true
      }] : [],
      potentialAction: actions.map(act => ({
        "@type": "OpenUri",
        name: act.name,
        targets: [{ os: "default", uri: act.url }]
      }))
    };

    if (dryRun) {
      core.info('🧪 Dry run mode:');
      console.log(JSON.stringify(messageCard, null, 2));
    } else {
      await axios.post(webhookUrl, messageCard);
      core.info('✅ MS Teams notification sent successfully.');
    }
  } catch (error) {
    core.setFailed(`Failed to send MS Teams message: ${error.message}`);
  }
})();