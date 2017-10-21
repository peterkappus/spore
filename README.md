# Spore

Beautiful things to look at.

## Usage
- Open `index.html` in a browser.
- Click a button.
- If width > 800px you can press a key and grab an SVG.

## Converting SVG to PNG (or whatever)
`cat file.svg | docker run -i dbtek/librsvg rsvg-convert -f png -w 10000> out.png`
Note: Use `-w` switch to provide width in pixels


### AWS Deployment
`s3cmd sync ./ s3://<YOUR_BUCKET_NAME> --delete-removed -P --rexclude=.git*`
