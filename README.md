This `README.md` is designed to help you or other developers set up the project from scratch, including the specific Blender configurations required to make the code work with your model.

---

# 🧊 Django 3D Interactive Cube

An interactive web application built with **Django** and **Google `<model-viewer>**`. This project features a custom-built 3D cube that reacts to user input by rotating to specific colored faces and performing a "glow" (emissive) animation.

## 🚀 Features

* **3D Visualization**: Renders a `.glb` model directly in the browser.
* **Dynamic Rotation**: The camera automatically orbits to the correct face based on the selected color.
* **Emissive Glow Animation**: Targeted materials "blink" using real-time emissive factor manipulation.
* **Interactive Controls**: Includes a random color generator and manual zoom in/out controls.

---

## 🛠️ 1. Blender Asset Configuration

To ensure the 3D model works with the code, the cube must be exported from Blender with the following specifications:

### Material Mapping

Assign these exact names to the faces of your cube in Blender:

| Material Name | Face Position | Base Color (Hex) | Emission Color |
| --- | --- | --- | --- |
| **BlueMat** | Right Side | `#1E88E5` | `#64B5F6` |
| **YellowMat** | Left Side | `#FBC02D` | `#FFF176` |
| **PurpleMat** | Back Side | `#8E24AA` | `#CE93D8` |
| **OrangeMat** | Front Side | `#FB8C00` | `#FFB74D` |
| **RedMat** | Top Side | `#E53935` | `#EF9A9A` |
| **GreenMat** | Bottom Side | `#43A047` | `#81C784` |

### Export Settings

1. **Apply Transforms**: Select the cube in Blender, press `Ctrl+A` > `All Transforms`.
2. **Origin**: Ensure the Origin is set to the center of the geometry.
3. **Format**: Export as **glTF 2.0 (.glb)**.
4. **Include**: Ensure "Materials" and "Export Material Names" are checked in the export settings.
5. **Path**: Place the file in your Django project at `static/models/colored_cube.glb`.

---

## 💻 2. Django Project Setup

### Folder Structure

```text
your_project/
├── static/
│   └── models/
│       └── colored_cube.glb  <-- Your Blender file
├── templates/
│   └── index.html            <-- The provided HTML code
├── manage.py
└── ...

```

### Installation

1. **Collect Static**: Ensure your `settings.py` is configured for static files, then run:
```bash
python manage.py collectstatic

```


2. **Dependencies**: This project uses a CDN for `<model-viewer>`, so no extra Python packages are required beyond Django itself.

---

## 🕹️ 3. How It Works

### Camera Logic

The script uses the `camera-orbit` attribute to move the observer rather than the object. This ensures the lighting remains consistent.

* **Front (Orange)**: `0deg 90deg`
* **Top (Red)**: `0deg 0deg`
* **Right (Blue)**: `90deg 90deg`

### Glow Effect

The "blink" is achieved via a Javascript `setInterval`. It accesses the model's material stack, finds the matching `material.name`, and toggles the `setEmissiveFactor` between `[0,0,0]` (Off) and a high-intensity RGB value (On).

---

## 📜 4. License

This project is open-source. Feel free to use and modify it for your own 3D web experiments!

---

**Would you like me to provide the `views.py` code to link this template to a URL?**

To allow someone else to run your project on their system after cloning from GitHub, you need to provide clear environment setup instructions.

Here is the updated **Installation & Setup** section to add to your `README.md`.

---

## 🛠️ 5. Running on Another System (Git Clone)

Follow these steps to set up the project locally after cloning.

### Prerequisites

* **Python 3.8+** installed.
* **Git** installed.

### Step-by-Step Setup

**1. Clone the Repository**
Open your terminal or command prompt and run:

```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name

```

**2. Create a Virtual Environment**
It is highly recommended to use a virtual environment to keep dependencies isolated.

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate

```

**3. Install Django**

```bash
pip install django

```

*(Note: If you have a `requirements.txt` file, run `pip install -r requirements.txt` instead.)*

**4. Configure Static Files**
Ensure your `settings.py` has the correct static configuration:

```python
import os

STATIC_URL = 'static/'
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]

```

Verify that the 3D model is present at `static/models/colored_cube.glb`.

**5. Run Migrations**
Even if you aren't using a database yet, Django requires initial metadata tables.

```bash
python manage.py migrate

```

**6. Start the Server**

```bash
python manage.py runserver

```

**7. Access the App**
Open your browser and navigate to:
`http://127.0.0.1:8000/`

---

## ⚠️ Common Issues & Troubleshooting

* **Model Not Loading (404 Error):** If the cube doesn't appear, check the browser console ($F12$). Ensure the path in `index.html` matches your folder structure: `src="{% static 'models/colored_cube.glb' %}"`.
* **CORS Policy:** If you are hosting the `.glb` file on a different server (like AWS S3), you must enable Cross-Origin Resource Sharing (CORS) on that bucket to allow `<model-viewer>` to read the file.
* **Blender Orientation:**
If the faces are rotated incorrectly on a different machine, ensure you "Applied Rotation" in Blender before exporting the `.glb`.

---

### Pro-Tip for Git

To make it easier for others, create a `requirements.txt` file in your main folder before pushing to GitHub:

```bash
pip freeze > requirements.txt

```

Would you like me to help you write the **`.gitignore`** file so you don't accidentally upload unnecessary files (like `__pycache__` or the virtual environment) to GitHub?