#convert to a png
#usage: $ convert.sh <infile> <outfile> <width>
cat $1 | docker run -i dbtek/librsvg rsvg-convert -f png -w $3 > $2
