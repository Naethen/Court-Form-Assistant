import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';
import DescriptionIcon from '@mui/icons-material/Description';
import AnimatedSection from '../components/animations/AnimatedSection';

const formTypes = [
  {
    id: 'small-claims',
    title: 'Small Claims',
    description: 'File a small claims case for disputes up to $10,000',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'divorce',
    title: 'Divorce',
    description: 'Complete divorce paperwork including property division and custody arrangements',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'name-change',
    title: 'Name Change',
    description: 'Request a legal name change for yourself or a minor',
    image: 'https://images.unsplash.com/photo-1551590192-8070a16d9f67?auto=format&fit=crop&w=500&q=80',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

function Home() {
  const navigate = useNavigate();

  return (
    <Container className="content">
      <AnimatedSection>
        <Box sx={{ 
          my: 4, 
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <Player
            autoplay
            loop
            src="https://assets8.lottiefiles.com/packages/lf20_sz668bpn.json"
            style={{ height: '300px' }}
          />
          
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom 
            sx={{
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              fontWeight: 'bold'
            }}
          >
            Welcome to Court Form Assistant
          </Typography>
          
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'text.secondary',
              maxWidth: '800px',
              margin: '0 auto',
              mb: 4
            }} 
            paragraph
          >
            Simplify your legal paperwork process with our easy-to-use form wizard
          </Typography>
        </Box>
      </AnimatedSection>

      <Grid container spacing={4} justifyContent="center">
        {formTypes.map((form, index) => (
          <Grid item xs={12} sm={6} md={4} key={form.id}>
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={index}
            >
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  }
                }}
              >
                <Box 
                  sx={{
                    height: 200,
                    overflow: 'hidden',
                    position: 'relative'
                  }}
                >
                  <img
                    src={form.image}
                    alt={form.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                      p: 2,
                    }}
                  >
                    <Typography variant="h5" component="h2" sx={{ color: 'white' }}>
                      {form.title}
                    </Typography>
                  </Box>
                </Box>
                
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography color="text.secondary">
                    {form.description}
                  </Typography>
                </CardContent>
                
                <CardActions>
                  <Button 
                    fullWidth 
                    variant="contained"
                    onClick={() => navigate(`/form/${form.id}`)}
                    sx={{
                      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                      color: 'white',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #1976D2 30%, #1CA7D2 90%)',
                      }
                    }}
                  >
                    Start Form
                  </Button>
                </CardActions>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Home;
