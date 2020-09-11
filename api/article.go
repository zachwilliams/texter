package api

import (
	"time"

	"github.com/gin-gonic/gin"
	"github.com/zachwilliams/texter/core"
)

//Article -- object to hold/parse data from Article table and article response json
type Article struct {
	tableName struct{} `pg:"articles,alias:a"`

	ID      uint64 `json:"-"`
	Content string `json:"content"`

	Flagged bool `json:"flagged" pg:"-"`
	Count   int  `json:"count" pg:"-"`

	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

func listArticles(c *gin.Context) {
	ctx := c.Request.Context()

	articles := make([]*Article, 0)
	if err := core.PGMain().ModelContext(ctx, &articles).
		ColumnExpr("?TableColumns").
		Select(); err != nil {
		c.Error(err)
		return
	}

	c.JSON(200, gin.H{
		"articles":      articles,
		"articlesCount": len(articles),
	})
}
