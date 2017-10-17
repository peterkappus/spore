# Spore

Beautiful things to look at.

## Usage
- Open `index.html` in a browser.
- Click a button.
- If width > 800px you can press a key and grab an SVG.

### AWS Deployment
`s3cmd sync ./ s3://<YOUR_BUCKET_NAME> --delete-removed -P --rexclude=.git*`
