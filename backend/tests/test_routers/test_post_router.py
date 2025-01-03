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

    posts = data["posts"]
    total_count = data["total_count"]

    # 기본 정렬(desc) 검증
    assert len(posts) > 0
    assert total_count > 0
    assert posts[0]["title"] == test_post["title"]
    assert posts[0]["content"] == test_post["content"]

    # 오래된 순 정렬(asc) 테스트
    response = client.get("/posts/?order=asc")
    assert response.status_code == 200
    data = response.json()

    posts = data["posts"]
    assert len(posts) > 0

    # 오래된 순으로 정렬 확인
    dates = [post["date_created"] for post in posts]
    assert dates == sorted(dates), "Posts are not sorted in ascending order."


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
