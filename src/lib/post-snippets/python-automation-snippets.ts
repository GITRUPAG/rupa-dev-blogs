// src/lib/post-snippets/python-automation-snippets.ts

export const pythonAutomationSnippets = {
  fileOps: `import os
import shutil
from pathlib import Path

# pathlib — the modern way to handle paths
base = Path("project")
base.mkdir(exist_ok=True)

# Create files
(base / "readme.txt").write_text("# My Project\\nA sample project.")
(base / "config.json").write_text('{"debug": true, "port": 8000}')

# Read files
content = (base / "readme.txt").read_text()
print(content)

# List directory
print("Files in project/:")
for item in base.iterdir():
    size = item.stat().st_size
    print(f"  {item.name:20} {size} bytes")

# Find all .txt files recursively
txt_files = list(base.rglob("*.txt"))
print(f"\\nFound {len(txt_files)} .txt file(s)")

# Copy and rename
shutil.copy(base / "readme.txt", base / "readme_backup.txt")
(base / "readme_backup.txt").rename(base / "README_COPY.txt")`,

  requestsApi: `import json

# Simulating what requests would do (browser-safe demo)
def fake_api_call(endpoint):
    """Simulates an API response"""
    mock_data = {
        "/users/1": {
            "id": 1,
            "name": "Leanne Graham",
            "username": "Bret",
            "email": "Sincere@april.biz",
            "company": {"name": "Romaguera-Crona"}
        },
        "/posts": [
            {"id": 1, "title": "Post One", "userId": 1},
            {"id": 2, "title": "Post Two", "userId": 1},
            {"id": 3, "title": "Post Three", "userId": 2},
        ]
    }
    return mock_data.get(endpoint, {"error": "not found"})

# Simulate fetching a user
user = fake_api_call("/users/1")
print(f"User: {user['name']}")
print(f"Email: {user['email']}")
print(f"Company: {user['company']['name']}")

# Simulate fetching posts and filtering
posts = fake_api_call("/posts")
user_posts = [p for p in posts if p["userId"] == 1]
print(f"\\nPosts by user 1:")
for post in user_posts:
    print(f"  [{post['id']}] {post['title']}")`,
}