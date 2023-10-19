package main

type domain struct {
	rep Repository
}

type Repository interface {
	postUrlShortend(shortUrl string, longUrl string) error
	getLongUrl(shortUrl string) (longUrl string, err error)
}

type Handeler interface {
	postUrlShortend(longUrl string) (string, error)
}
