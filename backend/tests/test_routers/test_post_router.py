import pytest


@pytest.fixture
def test_user(client):
    response = client.post(
        "/users/",
        json={
            "username": "testuser",
            "email": "test@example.com",
            "password": "securepassword",
            "full_name": "Test User",
            "is_active": True,
        },
    )
    user = response.json()
    login_response = client.post(
        "/auth/login/",
        json={"username": "testuser", "password": "securepassword"},
    )
    token = login_response.json()["access_token"]
    return {"user": user, "access_token": token}


@pytest.fixture
def test_post(client, test_user):
    response = client.post(
        "/posts/",
        json={
            "title": "Test Post",
            "content": "This is a test post.",
            "published": True,
        },
        headers={"Authorization": f"Bearer {test_user['access_token']}"},
    )
    return response.json()


def test_create_post(client, test_user):
    response = client.post(
        "/posts/",
        json={
            "title": "Test Post",
            "content": "This is a test post.",
            "published": True,
        },
        headers={"Authorization": f"Bearer {test_user['access_token']}"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Test Post"
    assert data["content"] == "This is a test post."
    assert "id" in data
    assert data["published"] is True


def test_read_post(client, test_post):
    response = client.get(f"/posts/{test_post['id']}")
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == test_post["title"]
    assert data["content"] == test_post["content"]


def test_read_posts(client, test_post):
    response = client.get("/posts/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) > 0
    assert data[0]["title"] == test_post["title"]
    assert data[0]["content"] == test_post["content"]


def test_update_post(client, test_post, test_user):
    response = client.put(
        f"/posts/{test_post['id']}",
        json={
            "title": "Updated Test Post",
            "content": "This is an updated test post.",
            "published": False,
        },
        headers={"Authorization": f"Bearer {test_user['access_token']}"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Updated Test Post"
    assert data["content"] == "This is an updated test post."
    assert data["published"] is False


def test_delete_post(client, test_post, test_user):
    response = client.delete(
        f"/posts/{test_post['id']}",
        headers={"Authorization": f"Bearer {test_user['access_token']}"},
    )
    assert response.status_code == 200
    assert response.json() == {"message": "Post deleted successfully"}

    # 삭제 확인
    response = client.get(f"/posts/{test_post['id']}")
    assert response.status_code == 404
