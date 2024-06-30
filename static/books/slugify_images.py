import os
from slugify import slugify

def slugify_image_names(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff')):
                original_path = os.path.join(root, file)
                slugified_name = slugify(os.path.splitext(file)[0]) + os.path.splitext(file)[1]
                new_path = os.path.join(root, slugified_name)
                
                if original_path != new_path:
                    os.rename(original_path, new_path)
                    print(f'Renamed: {original_path} -> {new_path}')

if __name__ == "__main__":
    directory = input("Enter the directory path: ")
    slugify_image_names(directory)
