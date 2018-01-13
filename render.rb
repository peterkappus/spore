#Render SVG as JPG with multiply filters for consistent rendering in browser and JPG
#usage: ruby render.rb INFILE OUTFILE WIDTH
#this script looks for "mix-blend-mode: multiply" in the SVG and adds a call to "filter:url(#multiply);" as well as adding  a definition for the filter at the bottom of the SVG. Then it renders a JPG using a docker image with librsvg

#assign from our pased-in arguments
(infile, outfile, width) = ARGV;

#grab the text
svg_text = IO.read(infile)

#puts infile + "OK"
#exit

#convert
svg_text.gsub!(/mix-blend-mode:\s?multiply/,"filter:url(#multiply); mix-blend-mode: multiply")

filter_def=<<eof
<defs>
  <filter id="multiply">
      <feBlend mode="multiply" in="BackgroundImage"/>
    </filter>
  </defs>
eof

#add filter definition at the bottom
svg_text.gsub!("</svg>","#{filter_def}</svg>")

puts infile

#save to new file with "fixed_" prefix
IO.write("fixed_#{infile}", svg_text)

#convert using docker image
`cat "fixed_#{infile}" | docker run -i dbtek/librsvg rsvg-convert -f png -w #{width} > "#{outfile}"`
