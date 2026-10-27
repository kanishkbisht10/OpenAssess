def test_root_endpoint(client):
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert "OpenAssess" in data["message"]
    assert "docs" in data
    assert "health" in data


def test_health_check_endpoint(client):
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["app"] == "OpenAssess"
    assert data["version"] == "0.1.0"
    assert data["database"]["status"] in ("healthy", "unreachable")
    assert "redis" in data
    assert "timestamp" in data
