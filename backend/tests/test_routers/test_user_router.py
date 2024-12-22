def test_create_user(client):
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
    assert response.status_code == 200
    data = response.json()
    assert data["username"] == "testuser"
    assert data["email"] == "test@example.com"
    assert "id" in data


def test_read_user(client):
    response = client.get("/users/1")
    assert response.status_code == 200
    data = response.json()
    assert data["username"] == "testuser"
    assert data["email"] == "test@example.com"


def test_read_users(client):
    response = client.get("/users/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) > 0
    assert data[0]["username"] == "testuser"


def test_update_user(client):
    response = client.put(
        "/users/1",
        json={
            "username": "updateduser",
            "email": "updated@example.com",
            "password": "newpassword",
            "full_name": "Updated User",
            "is_active": False,
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["username"] == "updateduser"
    assert data["email"] == "updated@example.com"
    assert not data["is_active"]


def test_delete_user(client):
    response = client.delete("/users/1")
    assert response.status_code == 200
    assert response.json() == {"message": "User deleted successfully"}

    # 삭제 확인
    response = client.get("/users/1")
    assert response.status_code == 404
