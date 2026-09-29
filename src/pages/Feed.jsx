import './Feed.css';

const MOCK_POSTS = [
  {
    id: 1,
    designerName: 'Aria Vance',
    image: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?q=80&w=600&auto=format&fit=crop',
    title: 'Midnight Velvet Gown',
    desc: 'Bespoke velvet gown with intricate hand-embroidered silver thread detailing. Open for custom sizing.'
  },
  {
    id: 2,
    designerName: 'Elias Thorne',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=600&auto=format&fit=crop',
    title: 'Avant-Garde Streetwear',
    desc: 'Structured oversized coat featuring asymmetric lapels and sustainable wool blend.'
  },
  {
    id: 3,
    designerName: 'Mei Lin',
    image: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=600&auto=format&fit=crop',
    title: 'Silk Organza Two-Piece',
    desc: 'Ethereal sheer organza overlay with a structured silk bodice. Perfect for summer galas.'
  }
];

const Feed = () => {
  return (
    <div className="page-container">
      <header className="feed-header fade-up">
        <h1 className="hero-title">Designer <em className="title-italic">Feed</em></h1>
        <p className="hero-tagline">Discover and commission unique creations.</p>
      </header>

      <div className="feed-grid fade-up" style={{animationDelay: '0.3s'}}>
        {MOCK_POSTS.map(post => (
          <article key={post.id} className="feed-card">
            <div className="card-image-wrapper">
              <img src={post.image} alt={post.title} className="card-image" />
            </div>
            <div className="card-content">
              <span className="eyebrow">{post.designerName}</span>
              <h2 className="card-title">{post.title}</h2>
              <p className="card-desc">{post.desc}</p>
              <div className="card-actions">
                <button className="btn-primary" style={{width: '100%'}}>Request Commission</button>
                <button className="btn-outline" style={{width: '100%', marginTop: '10px'}}>Discuss Idea</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Feed;
