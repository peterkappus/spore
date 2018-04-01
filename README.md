# Spore

Beautiful things to look at.

## Usage
- Open `index.html` in a browser.
- Click a button.
- If width > 800px you can press a key and grab an SVG.

## Live updating with Docker & P5 Manager
- First time: `docker build -t p5manager .`
- Then, `docker run -it -p 5555:5555 -p 35729:35729 -v"$(PWD)":/app p5manager bash`
- Inside the container: `cd /app && p5 s`
- click the "." on the left and it should live reload whenever you change the code.


## Converting SVG to PNG (or whatever)
`cat file.svg | docker run -i dbtek/librsvg rsvg-convert -f png -w 10000 > out.png`
Note: Use `-w` switch to provide width in pixels

## Notes on blend modes (e.g. multiply)
The only way I could get things to blend properly using SVG files was to add `mix-blend-mode: multiply` to the style of the element (for browser rendering) and also add an `feBlend` filter in the `defs` section of the doc and refer to it in each element I wanted to blend (for rendering by librsvg/Cairo) (NOTE: adding these styles could probably  be done via a single `g` (group) element rather than by applying to individual elements). You'll need to do some search/replacing to get things to render correctly but use the following example as a guide:

```<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<defs>
  <filter id="multiply">
      <feBlend mode="multiply" in="BackgroundImage"/>
    </filter>
  </defs>
    <rect x="10" y="10" width="50" height="50" fill="#fc0" style="filter:url(#multiply);mix-blend-mode:multiply"/>
    <rect x="25" y="25" width="50" height="50" fill="#fc0" style="filter:url(#multiply);mix-blend-mode:multiply"/>
</svg>
```


## Working with text
Here are some things I've learned about working with text...
- To load custom fonts, you must run the "index.html" within a web server. Try the python simple server `python -m SimpleHTTPServer 8000`
- Use the p5js `loadFont` method
- create a "fonts" folder (TODO: load these dynamically)
- Download the .ttf fonts required into the fonts folder
- Make sure you load the light/bold/etc version of the fonts you want to use.
- use the "textFont" method to style the text (remember to use the same font you loaded)
- Use the "fontStyle" to describe the font weight (is this really needed? Dunno. Use a string e.g. "Bold" NOT a constant e.g. BOLD)
- Want "bold" type in a rendered JPG? You'll need to modify the "font-weight" property: light=100; medium=300; bold=800;

*Need to render text?*
- create a "fonts" directory in the folder where you want to render your SVG
- Create a file called "fonts.conf" like so

```<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <dir>fonts/</dir>
  <cachedir>/tmp/fonts-cache/</cachedir>
  <config></config>
</fontconfig>
```

- Run `docker run -v "$(PWD):/app" -it dbtek/librsvg sh`
- Inside the container run
- `cd /app`
- Then run `FONTCONFIG_PATH=. rsvg-convert -f png -w [1000] [SVG_FILE].svg > out3.png`

## AWS Deployment
You might put this into a `deploy.sh` file to make life easier.
`s3cmd sync ./ s3://<YOUR_BUCKET_NAME> --delete-removed -P --rexclude=.git*`

### Need some inspiration:
https://github.com/chiunhau/p5-gallery
