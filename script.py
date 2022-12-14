import math
import numpy as np
import cv2 as cv
from cairosvg import svg2png
import sys



sys.stdout.flush()
svg_as_string = sys.argv[1]

width = ''
height = ''

nums_and_dot = '.0123456789'
for char in svg_as_string.split('width')[1].split(' ')[0]:
    if char in nums_and_dot:
        width += char
        
        
for char in svg_as_string.split('height')[1].split(' ')[0]:
    if char in nums_and_dot:
        height += char   





#convert svg to png
svg_width_num = float(width)
svg_height_num = float(height)
parent_width = '"' + str(math.floor((float(svg_width_num) * 1.1))) + 'cm' + '"'
parent_height = '"' + str(math.floor((float(svg_height_num) * 1.1))) + 'cm' + '"'
canvas_string = """<g width={} height={}><rect x="0" y="0" width="100%" height="100%" fill="white"/>{}</g>""".format(parent_width, parent_height, sys.argv[1])
png = svg2png(bytestring=canvas_string, write_to='output.png')

#finding contours 
im = cv.imread('output.png')



imgray = cv.cvtColor(im, cv.COLOR_BGR2GRAY)
ret, thresh = cv.threshold(imgray, 127, 255, 0)
contours, hierarchy = cv.findContours(thresh, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE)
#countour_img = cv.drawContours(im, contours, -1, (72,209,204), 3)

#replace black pixels with white ones
black_pixels = np.where(
    (im[:, :, 0] == 0) & 
    (im[:, :, 1] == 0) & 
    (im[:, :, 2] == 0)
)
im[black_pixels] = [255, 255, 255]

#draw countour
cv.drawContours(im, contours, -1, (0, 0, 0), 3)

#crop image 
y_start = math.floor(0 + len(im) * 0.005)
y_end = math.floor(len(im) - len(im) * 0.005)
x_start = math.floor(0 + len(im[0]) * 0.005)
x_end = math.floor(len(im[0]) - len(im[0]) * 0.005)
im = im[y_start:y_end, x_start:x_end]


#im = cv.imwrite('/Users/joostwindmoller/Desktop/{}.png'.format(sys.argv[2]), im)
cv.imwrite('/Users/joostwindmoller/Desktop/contour-pattern-generator/code/client/src/template.png', im)

#render
# cv.imshow('Contours', im)
# cv.waitKey(0); 
# cv.destroyAllWindows(); 
# cv.waitKey(1)

