package main

/*basic repository with the main purpos of testing*/

type basicRepository struct {
	db map[string]string
}

func (b *basicRepository) postUrlShortend(shortUrl string, longUrl string) error {
	b.db[shortUrl] = longUrl
	return nil
}

func (b *basicRepository) getLongUrl(shortUrl string) (longUrl string, err error) {
	result, _ := b.db[shortUrl]
	return result, nil
}

func NewBasicRepository() Repository {

	return &basicRepository{db: map[string]string{}}
}
