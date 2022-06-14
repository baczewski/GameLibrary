import { Button, CircularProgress, Container, DialogActions, DialogContent, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { FormEvent, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAsync } from "../../hooks/use-async";
import { useAsyncAction } from "../../hooks/use-async-action";
import { categoryService } from "../../services/category-service";
import { gameService } from "../../services/game-service";
import { HttpError } from "../../services/http-service";

interface ValidationError {
	fieldErrors: Record<string, string[]>;
	formErrors: string[];
}

const styles = {
	container: {
		marginTop: '50px',
		boxShadow: '0px 1px 90px 3px #000',
		width: '30%',
		paddingTop: '40px',
		borderRadius: '3px'
	},
	box: {
		display: 'grid',
		justifyContent: 'center',
		alignContent: 'center',
		rowGap: '10px',
		gridTemplateColumns: '70%'
	},
	actions: {
		display: 'flex',
		justifyContent: 'center',
		paddingBottom: '40px',
		margin: '0px auto'
	},
	button: {
		width: '50%',
		height: '50px',
		border: '1px solid black'
	}
}

export function CreateGameForm() {
	const [input, setInput] = useState({
		name: '',
		minAge: '',
		description: '',
		imageUrl: '',
		categories: [] as string[]
	});

	const navigate = useNavigate();

	const { trigger, loading, error }
		= useAsyncAction(async (event: FormEvent<HTMLFormElement>) => {
			event.preventDefault();

			const game = await gameService.createGame({
				name: input.name,
				minAge: Number(input.minAge),
				description: input.description,
				categories: input.categories,
				imageUrl: input.imageUrl
			});

			navigate(`/games/${game.id}`);
		});

	const {
		data: allCategories,
		loading: loadingCategories,
		error: errorCategories
	} = useAsync(() => categoryService.loadCategories(), []);

	const validationError = useMemo(() => {
		if (!error) {
			return undefined;
		}

		if (error instanceof HttpError && error.body.fieldErrors) {
			return error.body as ValidationError;
		}

		return undefined;
	}, [error]);

	if (loading) {
		return (
			<Typography component='div' sx={{ display: 'flex', justifyContent: 'center' }}>
				<CircularProgress />
			</Typography>
		)
	}

	return (
		<Container component='form' onSubmit={trigger} sx={styles.container}>
			<Typography variant='h3' align='center' marginBottom='20px'>
				Create game
			</Typography>
			<DialogContent sx={styles.box}>
				<TextField
					variant='filled'
					label='Name'
					value={input.name}
					error={!!validationError?.fieldErrors['name']}
					helperText={validationError?.fieldErrors['name']?.join(', ')}
					onChange={(e) => setInput({ ...input, name: e.target.value })}
				/>

				<TextField
					variant='filled'
					label='Min age'
					value={input.minAge}
					error={!!validationError?.fieldErrors['minAge']}
					helperText={validationError?.fieldErrors['minAge']?.join(', ')}
					onChange={(e) => setInput({ ...input, minAge: e.target.value })}
				/>

				<TextField
					variant='filled'
					label='Description'
					value={input.description}
					error={!!validationError?.fieldErrors['description']}
					helperText={validationError?.fieldErrors['description']?.join(', ')}
					onChange={(e) => setInput({ ...input, description: e.target.value })}
				/>

				<TextField
					variant='filled'
					label='Image URL'
					value={input.imageUrl}
					onChange={(e) => setInput({ ...input, imageUrl: e.target.value })}
				/>

				{allCategories && (<FormControl>
					<InputLabel>Categories</InputLabel>
					<Select
						multiple
						label='Categories'
						value={input.categories}
						error={!!validationError?.fieldErrors['categories']}
						onChange={(e) => {
							const value = e.target.value;
							const categoryNames = typeof value === 'string' ?
								value.split(',') : value;

							setInput({ ...input, categories: categoryNames });
						}}>
						{allCategories.map((category) => (
							<MenuItem key={category.id} value={category.name}>
								{category.name}
							</MenuItem>
						))}
					</Select>
					{!!validationError?.fieldErrors['categories'] && (
						<FormHelperText error sx={{ marginX: '0px' }}>
							{validationError?.fieldErrors['categories']}
						</FormHelperText>)}
				</FormControl>)}

			</DialogContent>
			<DialogActions sx={styles.actions}>
				<Button type='submit' sx={styles.button}>Submit</Button>
			</DialogActions>

		</Container>
	)
}