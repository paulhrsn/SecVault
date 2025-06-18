.PHONY: init backend frontend all

init:
	python3 -m venv venv && \
	source venv/bin/activate && \
	pip install -r requirements.txt

backend:
	source venv/bin/activate && \
	export FLASK_APP=app.py && \
	flask run

frontend:
	cd static && python3 -m http.server 3000

all: init backend frontend
