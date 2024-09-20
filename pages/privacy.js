// pages/privacy.js

import { Box, Text, Heading, Stack, Divider } from '@chakra-ui/react';

const PrivacyPolicy = () => {
  return (
    <Box maxW="800px" mx="auto" py={10} px={5}>
      <Heading as="h1" size="xl" mb={6} textAlign="center" color="red.400">
        Politique de Confidentialité
      </Heading>

      <Stack spacing={6}>
        <Heading as="h2" size="md" color="red.300">
          1. Introduction
        </Heading>
        <Text>
          Bienvenue sur <strong>Projet F1</strong>. En accédant à notre site web ou en utilisant nos services, vous acceptez de vous conformer et d’être lié par les présentes Conditions d'Utilisation. Ces conditions définissent les droits et obligations des utilisateurs du site <strong>Projet F1</strong>.
          <br />
          Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre site ou nos services.
        </Text>

        <Divider />

        <Heading as="h2" size="md" color="red.300">
          2. Définition des Services
        </Heading>
        <Text>
          <strong>Projet F1</strong> est une plateforme dédiée aux passionnés de Formule 1 qui propose des informations actualisées sur les courses, les classements, les pilotes, ainsi que des articles d'actualité. Nous offrons des fonctionnalités interactives, telles que l'affichage de classements en temps réel et des calendriers de courses.
        </Text>

        <Divider />

        <Heading as="h2" size="md" color="red.300">
          3. Accès au Site et aux Services
        </Heading>
        <Text>
          L'accès à notre site est gratuit, mais certaines fonctionnalités ou services peuvent nécessiter une inscription ou un abonnement. Nous nous réservons le droit de modifier, suspendre ou interrompre à tout moment et sans préavis, tout ou partie des services proposés sur le site.
          <br />
          <strong>Conditions d'âge :</strong> Vous devez être âgé d'au moins 13 ans pour utiliser notre site. Si vous avez moins de 13 ans, veuillez obtenir la permission de votre tuteur légal avant d'utiliser le site.
        </Text>

        <Divider />

        <Heading as="h2" size="md" color="red.300">
          4. Compte Utilisateur
        </Heading>
        <Text>
          Pour accéder à certaines parties du site, il est nécessaire de créer un compte utilisateur. Vous êtes responsable de l'exactitude des informations fournies lors de l'inscription et de la sécurité de votre mot de passe. Toute activité réalisée depuis votre compte est de votre responsabilité.
          <br />
          Si vous suspectez une utilisation non autorisée de votre compte, veuillez nous en informer immédiatement.
        </Text>

        <Divider />

        <Heading as="h2" size="md" color="red.300">
          5. Contenu du Site
        </Heading>
        <Text>
          Tous les contenus publiés sur <strong>Projet F1</strong>, y compris mais sans s'y limiter les textes, images, graphiques, vidéos et autres documents (ci-après, "Contenu"), sont protégés par des droits d'auteur, des marques et d'autres droits de propriété intellectuelle.
          <br />
          <strong>Utilisation personnelle :</strong> Vous pouvez consulter, télécharger et imprimer du contenu pour votre usage personnel et non commercial, à condition que vous respectiez les droits d'auteur et autres droits de propriété.
          <br />
          <strong>Restrictions :</strong> Vous ne pouvez pas reproduire, distribuer, modifier ou publier tout ou partie du contenu sans notre autorisation écrite préalable.
        </Text>

        <Divider />

        <Heading as="h2" size="md" color="red.300">
          6. Comportement de l'Utilisateur
        </Heading>
        <Text>
          En utilisant notre site, vous vous engagez à respecter les règles suivantes :
        </Text>
        <Box as="ul" pl={5} styleType="disc">
          <Box as="li">
            Ne pas enfreindre la loi : Vous ne devez pas utiliser notre site à des fins illégales ou non autorisées.
          </Box>
          <Box as="li">
            Respecter les autres utilisateurs : Vous ne devez pas harceler, abuser ou insulter d'autres utilisateurs du site.
          </Box>
          <Box as="li">
            Ne pas perturber le service : Vous vous engagez à ne pas introduire de virus ou d'autres technologies qui pourraient nuire à notre site ou à ses utilisateurs.
          </Box>
        </Box>
        <Text>
          En cas de violation de ces règles, nous nous réservons le droit de suspendre ou de résilier votre compte.
        </Text>

        <Divider />

        <Heading as="h2" size="md" color="red.300">
          7. Contenu Généré par l'Utilisateur
        </Heading>
        <Text>
          Si vous soumettez du contenu (par exemple, des commentaires, des images ou des avis) sur notre site, vous nous accordez une licence non exclusive, libre de droits, mondiale et transférable pour utiliser, reproduire, distribuer et afficher ce contenu sur notre site.
          <br />
          Vous êtes seul responsable du contenu que vous soumettez et vous garantissez qu'il n'enfreint aucun droit de tiers.
        </Text>

        <Divider />

        <Heading as="h2" size="md" color="red.300">
          8. Responsabilité et Garantie
        </Heading>
        <Text>
          Nous faisons de notre mieux pour assurer l'exactitude des informations disponibles sur notre site. Cependant, nous ne garantissons pas que le contenu soit exempt d'erreurs ou à jour.
          <br />
          <strong>Limitation de responsabilité :</strong> <strong>Projet F1</strong> ne peut être tenu responsable des dommages directs, indirects ou consécutifs résultant de l'utilisation de notre site ou de l'incapacité à accéder à celui-ci.
          <br />
          <strong>Interruption des services :</strong> Nous nous efforçons de maintenir le site en ligne en permanence, mais nous ne pouvons garantir l'accessibilité du site à tout moment.
        </Text>

        <Divider />

        <Heading as="h2" size="md" color="red.300">
          9. Liens Vers des Sites Tiers
        </Heading>
        <Text>
          Notre site peut contenir des liens vers des sites web tiers. Ces liens sont fournis uniquement pour votre commodité. Nous n'avons aucun contrôle sur ces sites et nous déclinons toute responsabilité quant à leur contenu ou à leurs pratiques.
        </Text>

        <Divider />

        <Heading as="h2" size="md" color="red.300">
          10. Modifications des Conditions d'Utilisation
        </Heading>
        <Text>
          Nous nous réservons le droit de modifier ces Conditions d'Utilisation à tout moment. Toute modification sera publiée sur cette page et prendra effet immédiatement après sa publication. Nous vous encourageons à consulter régulièrement cette page pour rester informé des éventuelles mises à jour.
        </Text>

        <Divider />

        <Heading as="h2" size="md" color="red.300">
          11. Résiliation
        </Heading>
        <Text>
          Nous nous réservons le droit de suspendre ou de résilier votre accès au site à tout moment et sans préavis, notamment en cas de non-respect de ces Conditions d'Utilisation.
        </Text>

        <Divider />

        <Heading as="h2" size="md" color="red.300">
          12. Droit Applicable et Juridiction
        </Heading>
        <Text>
          Ces Conditions d'Utilisation sont régies par les lois françaises. Tout litige découlant de l'utilisation du site ou des services sera soumis à la juridiction exclusive des tribunaux compétents en France.
        </Text>

        <Divider />

        <Heading as="h2" size="md" color="red.300">
          13. Nous Contacter
        </Heading>
        <Text>
          Si vous avez des questions concernant ces Conditions d'Utilisation, veuillez nous contacter à :
          <br />
          <strong>Adresse e-mail :</strong> contact@projetf1.com
          <br />
          <strong>Adresse postale :</strong> Projet F1, 123 Rue de la F1, 75000 Paris, France
        </Text>
      </Stack>
    </Box>
  );
};

export default PrivacyPolicy;
