from PIL import Image
import pytesseract
from pdf2image import convert_from_path

PDF = "PDF.pdf"

page = convert_from_path(PDF, 1)

file = "JPG.jpg"

page.save(file, 'JPEG')

output = "output.txt"

f = open(outfile, "a")

text = str(((pytesseract.image_to_string(Image.open(file)))))

f.write(text)
f.close() 
