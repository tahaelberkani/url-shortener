package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

type chiHttpServer struct {
	serv service
}

func NewChiHttpServer(s service) *chiHttpServer {
	return &chiHttpServer{
		serv: s,
	}
}

func (h *chiHttpServer) Run() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Post("/", h.shortenUrl)
	r.Get("/{shortUrl}", h.getUrl)
	http.ListenAndServe(":3000", r)
}

func (s *chiHttpServer) shortenUrl(w http.ResponseWriter, r *http.Request) {
	jsonData, _ := r.GetBody

	_ = json.Unmarshal([]byte(jsonData), &data)
	if err != nil {
		fmt.Printf("could not unmarshal json: %s\n", err)
		return
	}
	w.Write([]byte("Hello World!"))
}

func (s *chiHttpServer) getUrl(w http.ResponseWriter, r *http.Request) {
	shortUrl := chi.URLParam(r, "shortUrl")
	s.serv.rep.getLongUrl()
	w.Write([]byte("Hello World!"))
}
