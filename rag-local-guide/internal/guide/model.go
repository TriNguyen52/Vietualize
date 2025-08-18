package guide

type LocalGuide struct {
    ID          string  `json:"id"`
    Name        string  `json:"name"`
    Description string  `json:"description"`
    Location    string  `json:"location"`
    Rating      float64 `json:"rating"`
    Tags        []string `json:"tags"`
}

type GuideInput struct {
    Name        string   `json:"name"`
    Description string   `json:"description"`
    Location    string   `json:"location"`
    Rating      float64  `json:"rating"`
    Tags        []string `json:"tags"`
}