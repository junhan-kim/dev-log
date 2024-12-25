import pytest

mock_user = {
    "username": "testuser",
    "password": "password123"
}


@pytest.fixture(scope="module")
def mock_user_in_db(client):
    response = client.post(
        "/users/",
        json={
            "username": mock_user["username"],
            "email": "testuser@example.com",
            "password": mock_user["password"],
            "full_name": "Test User",
            "is_active": True,
        },
    )
    assert response.status_code == 200
    user_data = response.json()
    yield user_data

    # 테스트 종료 후 데이터 삭제
    client.delete(f"/users/{user_data['id']}")


def test_login_success(client, mock_user_in_db):
    print("Mock User in DB:", mock_user_in_db)  # 디버깅: 생성된 사용자 확인
    response = client.post("/auth/login/", json={
        "username": mock_user["username"],
        "password": mock_user["password"]
    })
    print("Login Response Status Code:", response.status_code)  # 디버깅: 상태 코드 확인
    print("Login Response JSON:", response.json())  # 디버깅: 응답 내용 확인
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"


def test_get_profile(client, mock_user_in_db):
    login_response = client.post("/auth/login", json={
        "username": mock_user["username"],
        "password": mock_user["password"]
    })
    token = login_response.json()["access_token"]

    response = client.get(
        "/auth/profile",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 200
    assert response.json()["message"] == f"Hello, {mock_user['username']}"
