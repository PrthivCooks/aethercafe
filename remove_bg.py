import sys
from PIL import Image

def remove_black_background(input_path, output_path, tolerance=30):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()

    new_data = []
    for item in data:
        # Check if the pixel is dark (r, g, b are all less than tolerance)
        if item[0] < tolerance and item[1] < tolerance and item[2] < tolerance:
            # Change dark pixels to transparent
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)

    img.putdata(new_data)
    img.save(output_path, "PNG")
    print(f"Processed {input_path} -> {output_path}")

if __name__ == "__main__":
    remove_black_background(sys.argv[1], sys.argv[2], int(sys.argv[3]))
