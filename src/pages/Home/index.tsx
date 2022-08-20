import { Play } from 'phosphor-react'
import {
  Button,
  CountDown,
  FormContainer,
  HomeContainer,
  MinutesInput,
  Separator,
  TaskInput,
} from './styles'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(5).max(60),
})

export function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newCycleFormValidationSchema),
  })

  function handleCreateNewCycle(data: any) {}

  const task = watch('task')
  const isDisableSubmit = !task
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            type="text"
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestions"
            {...register('task')}
          />
          <datalist id="task-suggestions">
            <option value="Projeto 1"></option>
            <option value="Projeto 2"></option>
          </datalist>
          <label htmlFor="minutesAmount">durante</label>
          <MinutesInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={0}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountDown>
          <span>0</span>
          <span>0</span>

          <Separator>:</Separator>

          <span>0</span>
          <span>0</span>
        </CountDown>

        <Button disabled={isDisableSubmit} type="submit">
          <Play size={24} />
          Começar
        </Button>
      </form>
    </HomeContainer>
  )
}
