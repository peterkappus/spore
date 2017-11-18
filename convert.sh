#convert to a png
#usage: $ convert.sh <infile> <outfile>
cat $1 | docker run -i dbtek/librsvg rsvg-convert -f png -w 10000 > $2
