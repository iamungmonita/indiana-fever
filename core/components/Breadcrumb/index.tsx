import { Breadcrumbs, Link, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function Breadcrumb() {
    const router = useRouter();

    // Split the pathname into an array and filter out empty strings
    const pathArray = router.pathname.split('/').filter((path) => path);

    // Create the breadcrumb items
    return (
        <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            sx={{ marginBottom: 2 }}
        >
            {/* Add a home link */}
            <Link underline="hover" color="inherit" href="/">
                Home
            </Link>

            {/* Loop through the pathArray to generate breadcrumb links */}
            {pathArray.map((path, index) => {
                // Create the URL to this breadcrumb item
                const href = '/' + pathArray.slice(0, index + 1).join('/');
                const isLast = index === pathArray.length - 1;

                return isLast ? (
                    <Typography color="text.primary" key={index} sx={{ textTransform: 'capitalize' }}>
                        {path.replace(/-/g, ' ')}
                    </Typography>
                ) : (
                    <Link
                        underline="hover"
                        color="inherit"
                        href={href}
                        key={index}
                        sx={{ textTransform: 'capitalize' }}
                    >
                        {path.replace(/-/g, ' ')}
                    </Link>
                );
            })}
        </Breadcrumbs>
    );
}



